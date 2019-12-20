import React, { useState, useEffect, Component } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import API from "../../adapters/API";
import Map from "./Map";

export default class EventPage extends Component {
  state = {
    eventId: this.props.match.params.id,
    currentEvent: ""
  };

  componentDidMount() {
    fetch(`http://localhost:3000/events/${this.state.eventId}`)
      .then(res => res.json())
      .then(event => this.setState({ currentEvent: event }));
  }

  render() {
    const handleDelete = e => {
      console.log(e.target.value);
      API.deleteEvent(e.target.value).then(event => {
        this.props.history.push("/");
      });
    };

    const handleEdit = () => {
      this.props.setEventEdit(this.state.currentEvent);
    };

    
    return (
      <div class="ui grid" style={{ height: "84.5vh", width: "100%" }}>
        <div class="sixteen wide column">
          <h1>{this.state.currentEvent.title}</h1>
          <p>
            {this.state.currentEvent.location
              ? this.state.currentEvent.location
              : null}
            , {this.state.currentEvent.date}
          </p>
          <img src={this.state.currentEvent.image_url} alt="Failed to load" />

          <div>
            {this.props.artist ? (
              <div>
                <Link to="/event/edit">
                  <Button onClick={handleEdit} value="test">
                    Edit Event
                  </Button>
                </Link>
                <Button
                  onClick={handleDelete}
                  value={this.state.currentEvent.id}
                >
                  Delete Event
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div class="eight wide column">
          <h2>Event Creator:</h2>
          {this.state.currentEvent.artist ? (
            <div>
              <p>{this.state.currentEvent.artist.artist_name}</p>
              <a
                href={this.state.currentEvent.artist.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
              <img
                src={this.state.currentEvent.artist.image_url}
                style={{ height: "100%", width: "100%" }}
                alt="Failed to Load."
              />
              <p>{this.state.currentEvent.artist.description}</p>
            </div>
          ) : (
            "goodbyes"
          )}
        </div>
        <div class="eight wide column">
          {this.state.currentEvent.latitude ? (
            <Map
              latitude={this.state.currentEvent.latitude}
              longitude={this.state.currentEvent.longitude}
              style={{ height: "100%", width: "100%" }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
