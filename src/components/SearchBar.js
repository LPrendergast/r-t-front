import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";

export default class SearchBar extends Component {
  state = {
    isLoading: false,
    results: [],
    value: "",
    artists: [],
    events: [],
    data: [],
    results: [],
    chosenResult: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/artists")
      .then(res => res.json())
      .then(artists =>
        this.setState({ data: [...this.state.data, ...artists] })
      )
      .then(
        fetch("http://localhost:3000/events")
          .then(res => res.json())
          .then(events =>
            this.setState({ data: [...this.state.data, ...events] })
          )
      );
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ chosenResult: result }, () => {
      if (result.title) {
        this.props.history.push(`/events/${result.id}`);
      }
      if (result.artist_name) {
        this.props.history.push(`/artists/${result.id}`);
      }
    });

  testThing = result => {
    if (result.title) {
      this.props.history.push(`/events/${result.id}`);
    }
    if (result.artist_name) {
      this.props.history.push(`/artists/${result.id}`);
    }
  };

  handleSearchChange = (e, { value }) => {
    // e.preventDefault();
    this.setState({ isLoading: true, value, results: [] });
    const query = value.toLowerCase();

    const thingy = this.state.data.filter(thing => {
      if (thing.title) {
        if (thing.title.includes(query)) {
          return thing.title.includes(query);
        }
      }
      if (thing.artist_name) {
        if (thing.artist_name.includes(query)) {
          return thing.artist_name.includes(query);
        }
      }
      return this.setState({ results: [] });
    });

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
        value={value}
        placeholder="Search"
        {...this.props}
      />
    );
  }
}
