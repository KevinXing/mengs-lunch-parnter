import React from "react";

import SearchBar from "./SearchBar";
import bilibili from "../axios/bilibili";

class Subscriptions extends React.Component {
  searchBilibili = async (term) => {
    try {
      const resp = await bilibili.get("web-interface/search/type", {
        params: {
          keyword: encodeURIComponent(term),
          page: 1,
          search_type: "bili_user",
        },
      });
      console.log(resp);
    } catch (error) {
      console.log("error", error);
    }
  };

  onSubmit = (term) => {
    this.searchBilibili(term.vlogger);
  };

  render() {
    return <SearchBar onSubmit={this.onSubmit} />;
  }
}

export default Subscriptions;
