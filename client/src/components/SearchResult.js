import React from "react";
import { connect } from "react-redux";
import "../styles/SearchResult.css";
import { addSubscriptions } from "../actions/fetchSubscriptions";

class SearchResult extends React.Component {
  onClick = () => {
    this.props.addSubscriptions(this.props.result);
  };

  render() {
    return (
      <div className="item">
        <img
          className="ui middle aligned tiny circular image"
          // This is necessary unless the pic will not be loaded.
          referrerPolicy="no-referrer"
          alt=""
          src={this.props.result.pic}
        />
        <div className="content">
          <div id="searchResultHeader" className="header">
            {this.props.result.vlogger}
          </div>
        </div>
        <button
          id="subscribeButton"
          className="ui orange basic button"
          onClick={this.onClick}
        >
          <i className="user icon"></i>
          Subscribe
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = { addSubscriptions };

export default connect(null, mapDispatchToProps)(SearchResult);
