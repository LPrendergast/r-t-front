import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";

const initialState = {
  isLoading: false,
  results: [],
  value: "",
  artists: [],
  results: [],
  filteredData: []
};

export default class SearchBar extends Component {
  state = initialState;

  componentDidMount() {
    fetch("http://localhost:3000/artists")
      .then(res => res.json())
      .then(artists =>
        this.setState(previousState => ({
          artists
        }))
      );
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    e.preventDefault();

    this.setState({ isLoading: true, value });
    if (this.state.value.length < 3) return;

    const query = value.toLowerCase();

    const thingy = this.state.artists.filter(thing => {
      return thing.artist_name.includes(query);
    });

    console.log(thingy);

    setTimeout(() => {
      if (this.state.value.length < 1)
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
