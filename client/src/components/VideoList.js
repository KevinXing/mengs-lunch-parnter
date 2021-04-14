import React from "react";

import Video from "./Video";
import "../styles/VideoList.css";
import "../styles/icons.css";

class VideoList extends React.Component {
  renderList = () => {
    return this.props.videos.map((video) => {
      return <Video key={video.id} video={video} />;
    });
  };

  iconName = () => {
    if (this.props.source === "bilibili") {
      return "bilibili icon";
    } else if (this.props.source === "youtube") {
      return "youtube icon";
    } else {
      return "";
    }
  };

  render() {
    return (
      <div id="segment" className="ui segment">
        <div className="ui medium header">
          <h2>
            <i className={this.iconName()}></i>
            {this.props.author}
          </h2>
        </div>
        <div className="ui stackable five column grid">{this.renderList()}</div>
      </div>
    );
  }
}

export default VideoList;
