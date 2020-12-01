import React from "react";
import moment from "moment";
import Video from "./Video";
import bilibili from "../axios/bilibili";
import youtube from "../axios/youtube";
import "../styles/VideoList.css";
import "../styles/icons.css";

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], author: "", source: "" };
  }

  componentDidMount() {
    if (this.state.videos.length === 0) {
      if (this.props.source === "bilibili") {
        this.loadBilibili();
      } else {
        this.loadYoutube();
      }
    }
  }

  renderList = () => {
    return this.state.videos.map((video) => {
      return <Video key={video.id} video={video} />;
    });
  };

  loadBilibili = async () => {
    try {
      const resp = await bilibili.get("space/arc/search", {
        params: {
          mid: this.props.vloggerId,
          ps: 5,
          tid: 0,
          pn: 1,
          keyword: "",
          order: "pubdate",
          jsonp: "jsonp",
        },
      });
      const newVideos = resp.data.data.list.vlist.map((item) => ({
        title: item.title,
        date: new Date(item.created * 1000).toDateString(),
        pic: item.pic,
        id: item.aid,
        url: "//www.bilibili.com/video/" + item.bvid,
        duration: item.length,
      }));
      this.setState((state) => ({
        author: resp.data.data.list.vlist[0].author,
        videos: newVideos,
        source: "bilibili",
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  loadYoutube = async () => {
    try {
      // Fetch playlist id.
      const resp = await youtube.get("channels", {
        params: {
          id: this.props.vloggerId,
          part: "contentDetails",
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        },
      });
      const playlistId =
        resp.data.items[0].contentDetails.relatedPlaylists.uploads;

      // Fetch video list.
      const videos = await youtube.get("playlistItems", {
        params: {
          playlistId: playlistId,
          part: "snippet",
          maxResults: 5,
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        },
      });
      const ids = videos.data.items.map((item) => {
        return item.snippet.resourceId.videoId;
      });

      // Fetch video duration.
      const details = await youtube.get("videos", {
        params: {
          part: "contentDetails",
          id: ids.join(","),
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        },
      });

      console.log(details);
      const items = videos.data.items;
      var newVideos = [];

      for (var i = 0; i < items.length; i++) {
        const item = items[i];
        newVideos.push({
          title: item.snippet.title,
          date: new Date(item.snippet.publishedAt).toDateString(),
          pic: item.snippet.thumbnails.medium.url,
          id: item.id,
          url: "//www.youtube.com/watch?v=" + item.snippet.resourceId.videoId,
          duration: moment
            .duration(details.data.items[i].contentDetails.duration)
            .humanize(),
        });
      }
      console.log(newVideos);

      this.setState((state) => ({
        author: videos.data.items[0].snippet.channelTitle,
        videos: newVideos,
        source: "youtube",
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  iconName = () => {
    if (this.state.source === "bilibili") {
      return "bilibili icon";
    } else return "youtube icon";
  };

  render() {
    return (
      <div id="segment" className="ui segment">
        <div className="ui medium header">
          <h2>
            <i className={this.iconName()}></i>
            {this.state.author}
          </h2>
        </div>
        <div className="ui equal width grid">{this.renderList()}</div>
      </div>
    );
  }
}

export default VideoList;
