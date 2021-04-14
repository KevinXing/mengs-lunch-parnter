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
    this.state = { init: false };
  }

  componentDidMount() {
    this.props.fetchSubscriptions();
  }

  componentDidUpdate() {
    if (this.state.init === false && !_.isEmpty(this.props.vloggers)) {
      _.values(this.props.vloggers).forEach((info) => {
        this.props.addVideos(info.id, info.source);
      });
      this.setState({ init: true });
    }
  }

  renderLatestVideos = () => {
    if (!this.props.vloggers) {
      return null;
    }
    const result = [];
    _.values(this.props.vloggers).map((value) => {
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
    if (!this.props.vloggers) {
      return null;
    }
    return _.values(this.props.vloggers).map((value) => {
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
  vloggers: state.subscriptions,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCanvas);
