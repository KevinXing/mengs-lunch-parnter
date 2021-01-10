import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { addVideos } from "../actions/addVideos";
import { fetchSubscriptions } from "../actions/fetchSubscriptions";

import VideoList from "./VideoList";
import "../styles/VideoCanvas.css";

class VideoCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.vloggerInfos = [
      { id: 257215079, source: "bilibili" },
      { id: 99157282, source: "bilibili" },
      { id: 176037767, source: "bilibili" },
      { id: 398581197, source: "bilibili" },
      { id: "UCISrVZmDM4x-Rq9mmNUw7Zw", source: "youtube" },
      { id: 290526283, source: "bilibili" },
      { id: 25807917, source: "bilibili" },
      { id: "UCEDkO7wshcDZ7UZo17rPkzQ", source: "youtube" },
    ];
  }

  componentDidMount() {
    this.vloggerInfos.forEach((info) => {
      this.props.addVideos(info.id, info.source);
    });
    this.props.fetchSubscriptions();
  }

  renderLatestVideos = () => {
    const result = [];
    this.vloggerInfos.map((value) => {
      const key = value.source + "-" + value.id;
      if (!_.has(this.props.result, key)) {
        return null;
      }
      const detail = this.props.result[key];
      result.push(detail.videos[0]);
      return null;
    });
    result.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    });
    return <VideoList author="Latest Videos" videos={result} source="" />;
  };

  renderCanvas = () => {
    if (!this.props.result) {
      return null;
    }

    return this.vloggerInfos.map((value) => {
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

const mapDispatchToProps = { addVideos, fetchSubscriptions };

const mapStateToProps = (state) => ({
  result: state.videoList,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCanvas);
