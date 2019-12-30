import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";

const initialState = {
  isLoading: false,
  results: [],
  value: "",
  artists: [],
  events: []
};

export default class SearchBar extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        class="ui fluid"
        className="search-bar"
        input={{ icon: "search", iconPosition: "left" }}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
        placeholder="Search"
        {...this.props}
      />
    );
  }
}
