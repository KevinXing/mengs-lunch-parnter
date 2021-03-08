import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchSubscriptions } from "../actions/fetchSubscriptions";
import ImangeWithButton from "./ImageWithButton";

class SubscriptionDetails extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions();
    console.log("sub", this.props);
  }

  renderList() {
    if (_.isEmpty(this.props.vloggers)) {
      return null;
    }

    return Object.values(this.props.vloggers).map((vlogger) => {
      return (
        <div className="column" key={vlogger.id}>
          <ImangeWithButton vlogger={vlogger}></ImangeWithButton>
        </div>
      );
    });
  }

  render() {
    console.log("render sub", this.props);
    return (
      <div className="ui segment">
        <h2>Subscriptions</h2>
        <div className="ui seven column grid">{this.renderList()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = { fetchSubscriptions };

const mapStateToProps = (state) => ({
  vloggers: state.subscriptions,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionDetails);
