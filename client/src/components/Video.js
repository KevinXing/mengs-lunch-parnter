import React from "react";
import "../styles/Video.css";
import { getProxyURL } from "../axios/backend";
import { isMobileClient } from "../config";

class Video extends React.Component {
  render() {
    const { title, date, pic, url, duration } = this.props.video;
    let picUrl = pic;
    if (isMobileClient() && !picUrl.startsWith("http")) {
      picUrl = getProxyURL() + "/fetch/http:" + pic;
    }
    return (
      <div className="column">
        <a className="item" href={url} target="_blank" rel="noreferrer">
          <div className="aspect-ratio-box">
            <img
              className="ui rounded image"
              src={picUrl}
              // This is necessary unless the pic will not be loaded.
              referrerPolicy="no-referrer"
              alt=""
            />
          </div>
          <div id="videoContent" className="content">
            <div id="videoHeader" className="header">
              <div className="wrapper">{title}</div>
            </div>
            <div id="duration">
              {duration}
              <span id="date">{date}</span>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default Video;
