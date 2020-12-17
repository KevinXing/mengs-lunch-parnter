import React from "react";
import { Field, reduxForm } from "redux-form";

class SearchBar extends React.Component {
  render() {
    return (
      <form className="ui form" onSubmit={this.props.handleSubmit}>
        <label>Vlogger</label>
        <Field name="vlogger" component="input" type="text" />
        <button className="ui button primary">Search</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "searchBar",
})(SearchBar);
