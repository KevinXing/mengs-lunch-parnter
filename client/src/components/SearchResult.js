import React from "react";
import "../styles/SearchResult.css";

export default class SearchResult extends React.Component {
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
      </div>
    );
  }
}
