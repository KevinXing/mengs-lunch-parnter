import React from "react";
import Video from "./Video";
import bilibili from "../axios/bilibili";

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
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
          mid: 99157282,
          ps: 30,
          tid: 0,
          pn: 1,
          keyword: "",
          order: "pubdate",
          jsonp: "jsonp",
        },
      });
      const newVideos = resp.data.data.list.vlist.slice(0, 5).map((item) => ({
        title: item.title.slice(0, 20) + "...",
        date: new Date(item.created * 1000).toDateString(),
        id: item.aid,
      }));
      this.setState((state) => ({
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
          <div className="ui horizontal list">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

export default VideoList;
