import React from "react";

class Video extends React.Component {
  render() {
    const { title, date, pic, url } = this.props.video;
    return (
      <a className="item" href={url} target="_blank" rel="noreferrer">
        <div className="ui fluid container">
          <img
            className="ui medium image"
            src={pic}
            // This is necessary unless the pic will not be loaded.
            referrerPolicy="no-referrer"
            alt=""
          />
          <div className="content">
            <div className="header">{title}</div>
            {date}
          </div>
        </div>
      </a>
    );
  }
}

export default Video;
