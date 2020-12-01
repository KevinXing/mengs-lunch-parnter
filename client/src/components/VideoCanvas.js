import React from "react";
import VideoList from "./VideoList";
import "../styles/VideoCanvas.css";

class VideoCanvas extends React.Component {
  renderCanvas = () => {
    return this.props.vloggerInfos.map((vloggerInfo) => {
      return (
        <VideoList
          key={vloggerInfo.id}
          vloggerId={vloggerInfo.id}
          source={vloggerInfo.source}
        />
      );
    });
  };

  render() {
    return <div className="ui fluid container">{this.renderCanvas()}</div>;
  }
}

export default VideoCanvas;
