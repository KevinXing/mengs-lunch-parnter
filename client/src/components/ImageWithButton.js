import React from "react";
import { connect } from "react-redux";
import "../styles/ImageWithButton.css";
import { deleteSubscriptions } from "../actions/fetchSubscriptions";

class ImageWithButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  onClick = () => {
    this.props.deleteSubscriptions({
      id: this.props.vlogger.id,
      source: this.props.vlogger.source,
    });
  };

  render() {
    return (
      <div
        className="ui segment"
        onMouseOver={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
        id="seg"
      >
        <img
          src={this.props.vlogger.pic}
          alt=""
          className="ui tiny circular image"
          // This is necessary unless the pic will not be loaded.
          referrerPolicy="no-referrer"
        />
        {this.state.isHovered && (
          <button
            id="button"
            className="ui tiny icon circular button"
            onClick={this.onClick}
          >
            <i className="eye slash icon"></i>
          </button>
        )}
        <div className="content">{this.props.vlogger.vlogger}</div>
      </div>
    );
  }
}

const mapDispatchToProps = { deleteSubscriptions };

export default connect(null, mapDispatchToProps)(ImageWithButton);
