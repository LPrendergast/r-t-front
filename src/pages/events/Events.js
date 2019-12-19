import React, { Component } from "react";
import Event from "./Event.js";
import EventPage from "./EventPage.js";
import { useHistory, Redirect, Link } from "react-router-dom";

export default class Events extends Component {
  state = {
    events: []
  };
  componentDidMount() {
    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(data => this.setState({ events: data }));
  }

  handleClick = id => {
    const chosenEvent = this.state.events.find(event => event.id === id);
    console.log(chosenEvent.id);
    this.props.setChosenEvent(chosenEvent.id);
    this.props.history.push(`/events/${id}`);
  };

  render() {
    return (
      <div className="cards-div">
        {this.state.events.map(event => (
          <Event key={event.id} {...event} handleClick={this.handleClick} />
        ))}
      </div>
    );
  }
}
