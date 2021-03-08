import React from "react";
import { Field, reduxForm } from "redux-form";
import "../styles/SearchBar.css";

class SearchBar extends React.Component {
  render() {
    return (
      <form className="ui form" onSubmit={this.props.handleSubmit}>
        <h1 id="searchBarHeader">Search Vlogger</h1>
        <div className="ui grid">
          <div className="fourteen wide column">
            <Field name="vlogger" component="input" type="text" />
          </div>
          <div className="two wide column">
            <button className="ui button primary">Search</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "searchBar",
})(SearchBar);
