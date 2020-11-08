import React from "react";

class Video extends React.Component {
  render() {
    const { title, date } = this.props.video;
    return (
      <div className="item">
        <div className="content">
          <div className="header">{title}</div>
          {date}
        </div>
      </div>
    );
  }
}

export default Video;
