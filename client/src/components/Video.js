import React from "react";
import "../styles/Video.css";

class Video extends React.Component {
  render() {
    const { title, date, pic, url, duration } = this.props.video;
    return (
      <div className="column">
        <a className="item" href={url} target="_blank" rel="noreferrer">
          <img
            className="ui fluid rounded image"
            src={pic}
            // This is necessary unless the pic will not be loaded.
            referrerPolicy="no-referrer"
            alt=""
          />
          <div className="content">
            <div className="header">
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
