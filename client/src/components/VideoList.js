import React from "react";
import Video from "./Video";
import bilibili from "../axios/bilibili";

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], author: "" };
  }

  componentDidMount() {
    if (this.state.videos.length === 0) {
      this.loadBilibili();
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
      }));
      this.setState((state) => ({
        author: resp.data.data.list.vlist[0].author,
        videos: newVideos,
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    return (
      <div className="ui fluid container">
        <div className="ui segment">
          <div className="ui medium header">{this.state.author}</div>
          <div className="ui horizontal list">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

export default VideoList;
