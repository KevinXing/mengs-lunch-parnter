import React from "react";
import VideoList from "./VideoList";

class VideoCanvas extends React.Component {
  renderCanvas = () => {
    return this.props.vloggerIds.map((vloggerId) => {
      return <VideoList vloggerId={vloggerId} />;
    });
  };

  render() {
    return (
      <div className="ui fluid container">
        <div className="ui segment">
          <div className="ui horizontal list">{this.renderCanvas()}</div>
        </div>
      </div>
    );
  }
}

export default VideoCanvas;
