import React from "react";
import Video from "./Video";

class VideoList extends React.Component {
  renderList = () => {
    return this.props.videos.map((video) => {
      return <Video video={video} />;
    });
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
