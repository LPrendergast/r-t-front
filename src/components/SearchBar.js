import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";

// const initialState = {
//   isLoading: false,
//   results: [],
//   value: "",
//   artists: [],
//   events: [],
//   results: [],
//   filteredData: []
// };

export default class SearchBar extends Component {
  state = {
    isLoading: false,
    results: [],
    value: "",
    artists: [],
    events: [],
    results: [],
    filteredData: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/artists")
      .then(res => res.json())
      .then(artists => this.setState({ artists }))
      .then(
        fetch("http://localhost:3000/events")
          .then(res => res.json())
          .then(events => this.setState({ events }))
      );
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result });

  handleSearchChange = (e, { value }) => {
    // e.preventDefault();

    this.setState({ isLoading: true, value });
    const query = value.toLowerCase();

    const thingy = this.state.artists.filter(thing => {
      return thing.artist_name.includes(query);
    });
    // this.state.events.filter(thing => {
    //   return thing.title.includes(query);
    // }) ||

    console.log(thingy);

    setTimeout(() => {
      if (this.state.value.length < 1) return;
      this.setState({ isLoading: false, results: thingy });
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
        onSearchChange={this.handleSearchChange}
        results={results}
        // value={value}
        placeholder="Search"
        {...this.props}
      />
    );
  }
}
