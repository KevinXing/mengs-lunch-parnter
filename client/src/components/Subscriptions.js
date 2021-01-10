import React from "react";

import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import SubscriptionDetails from "./SubscriptionDetails";
import bilibili from "../axios/bilibili";
import youtube from "../axios/youtube";

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bilibiliSearchResult: [],
      hasBilibiliResult: true,
      youtubeSearchResult: [],
      hasYoutubeResult: true,
    };
  }

  searchBilibili = async (term) => {
    try {
      const resp = await bilibili.get("web-interface/search/type", {
        params: {
          keyword: encodeURIComponent(term),
          page: 1,
          search_type: "bili_user",
        },
      });
      if (resp.data.data.result === undefined) {
        this.setState(() => {
          return { hasBilibiliResult: false };
        });
        return;
      }
      const result = resp.data.data.result.map((item) => ({
        vlogger: item.uname,
        id: item.mid,
        pic: item.upic,
        url: "//space.bilibili.com/" + item.mid,
        source: "bilibili",
      }));
      this.setState(() => {
        return { bilibiliSearchResult: result, hasBilibiliResult: true };
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  searchYoutube = async (term) => {
    try {
      const resp = await youtube.get("search", {
        params: {
          part: "snippet",
          maxResults: 20,
          q: term,
          type: "channel",
          order: "viewCount",
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        },
      });
      console.log(resp.data);
      if (resp.data.pageInfo.resultsPerPage === 0) {
        this.setState(() => {
          return { hasYoutubeResult: false };
        });
        return;
      }
      const result = resp.data.items.map((item) => ({
        vlogger: item.snippet.channelTitle,
        id: item.id.channelId,
        pic: item.snippet.thumbnails.default.url,
        url: "//www.youtube.com/channel/" + item.id.channelId,
        source: "youtube",
      }));
      this.setState(() => {
        return { youtubeSearchResult: result, hasYoutubeResult: true };
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  onSubmit = (term) => {
    this.searchBilibili(term.vlogger);
    this.searchYoutube(term.vlogger);
  };

  render() {
    return (
      <div className="ui segment">
        <SubscriptionDetails />
        <SearchBar onSubmit={this.onSubmit} />
        <div className="ui grid">
          <div className="eight wide column">
            <SearchResultList
              source="bilibili"
              hasResult={this.state.hasBilibiliResult}
              results={this.state.bilibiliSearchResult}
            />
          </div>
          <div className="eight wide column">
            <SearchResultList
              source="youtube"
              hasResult={this.state.hasYoutubeResult}
              results={this.state.youtubeSearchResult}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Subscriptions;
