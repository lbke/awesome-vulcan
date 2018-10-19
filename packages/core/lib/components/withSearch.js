import React, { Component } from "react";
import _debounce from "lodash";

const withSearch = C =>
  class WithSearch extends Component {
    state = {
      query: ""
    };
    onQueryChange = evt => {
      this.setState({ query: evt.target.value });
    };
    render() {
      const { query } = this.state;
      const terms = { query };
      return (
        <C
          terms={terms}
          query={query}
          onQueryChange={this.onQueryChange}
          {...this.props}
        />
      );
    }
  };

export default withSearch;
