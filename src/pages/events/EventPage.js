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
import { Grid, Segment } from "semantic-ui-react";

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
      <Grid
        columns={2}
        style={{
          height: "85vh",
          margin: "0",
          padding: "0"
        }}
        stretched
        className="event-page"
      >
        <Grid.Row stretched celled style={{ margin: "0" }}>
          <Grid.Column width={10}>
            <Segment>
              <h1>{this.state.currentEvent.title}</h1>
              <p>
                {this.state.currentEvent.location
                  ? this.state.currentEvent.location
                  : null}
                , {this.state.currentEvent.date}
              </p>
              <img
                src={this.state.currentEvent.image_url}
                alt="Failed to load"
                style={{ height: "50%", width: "100%" }}
              />
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
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
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
            </Segment>
            <Segment
              style={{
                height: "100%",
                padding: "0",
                margin: "0"
              }}
            >
              {this.state.currentEvent.latitude ? (
                <Map
                  latitude={this.state.currentEvent.latitude}
                  longitude={this.state.currentEvent.longitude}
                  style={{
                    height: "100%",
                    width: "100%",
                    padding: "0",
                    margin: "0"
                  }}
                />
              ) : null}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
