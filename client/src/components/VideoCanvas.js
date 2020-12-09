import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { addVideos } from "../actions";
import VideoList from "./VideoList";
import "../styles/VideoCanvas.css";

class VideoCanvas extends React.Component {
  componentDidMount() {
    this.props.vloggerInfos.forEach((info) => {
      this.props.addVideos(info.id, info.source);
    });
  }

  renderLatestVideos = () => {
    const result = [];
    this.props.vloggerInfos.map((value) => {
      const key = value.source + "-" + value.id;
      if (!_.has(this.props.result, key)) {
        return null;
      }
      const detail = this.props.result[key];
      result.push(detail.videos[0]);
      return null;
    });
    return <VideoList author="Latest Videos" videos={result} source="" />;
  };

  renderCanvas = () => {
    if (!this.props.result) {
      return null;
    }

    return this.props.vloggerInfos.map((value) => {
      const key = value.source + "-" + value.id;
      if (!_.has(this.props.result, key)) {
        return null;
      }
      const detail = this.props.result[key];
      return (
        <VideoList
          key={key}
          author={detail.author}
          videos={detail.videos}
          source={detail.source}
        />
      );
    });
  };

  render() {
    return (
      <div className="ui fluid container">
        {this.renderLatestVideos()}
        {this.renderCanvas()}
      </div>
    );
  }
}

const mapDispatchToProps = { addVideos };

const mapStateToProps = (state) => ({
  result: state.videoInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCanvas);
