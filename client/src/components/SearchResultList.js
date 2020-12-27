import React from "react";
import SearchResult from "./SearchResult";
import "../styles/icons.css";

export default class SearchResultList extends React.Component {
  iconName = () => {
    if (this.props.source === "bilibili") {
      return "bilibili icon";
    } else if (this.props.source === "youtube") {
      return "youtube icon medium";
    } else {
      return "";
    }
  };
  render() {
    let rendered = null;
    if (!this.props.hasResult) {
      rendered = <div className="header">No Result</div>;
    } else {
      if (this.props.results.length === 0) {
        return null;
      }
      const results = this.props.results.map((item) => {
        return <SearchResult key={item.id} result={item} />;
      });
      rendered = <div className="ui relaxed divided list">{results}</div>;
    }

    return (
      <div className="ui segment">
        <h2>
          <i className={this.iconName()}></i>
          {this.props.source}
        </h2>
        {rendered}
      </div>
    );
  }
}
