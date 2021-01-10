import React from "react";

import backend from "../axios/backend";

class SubscriptionDetails extends React.Component {
  componentDidMount() {
    this.fetchSubscriptions();
  }

  fetchSubscriptions = async () => {
    try {
      const resp = await backend.get("subscriptions");
      console.log(resp);
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    return <div>Me</div>;
  }
}

export default SubscriptionDetails;
