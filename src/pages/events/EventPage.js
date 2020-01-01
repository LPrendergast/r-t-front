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
import DropDownBars from "../../components/DropDownBars.js";

export default class EventPage extends Component {
  state = {
    eventId: parseInt(this.props.match.params.id),
    currentEvent: "",
    bodyBackground: "",
    eventPageBackground: "",
    eventPageFontFamily: "",
    eventPageFontColour: "",
    eventPageEventColour: "",
    websiteBackground: ""
  };

  componentDidMount() {
    fetch(`http://localhost:3000/events/${this.state.eventId}`)
      .then(res => res.json())
      .then(event => this.setState({ currentEvent: event }))
      .then(event =>
        this.state.currentEvent.eventStyle != null
          ? this.setState({
              eventPageBackground: this.state.currentEvent.eventStyle
                .background_colour,
              eventPageFontFamily: this.state.currentEvent.eventStyle
                .font_family,
              eventPageFontColour: this.state.currentEvent.eventStyle
                .font_colour,
              websiteBackground: this.state.currentEvent.eventStyle
                .website_colour
            })
          : null
      );
  }

  handleBackgroundChange = colour => {
    this.setState({ eventPageBackground: colour });
  };

  handleFontChange = font => {
    this.setState({ eventPageFontFamily: font });
  };

  handleFontColourChange = colour => {
    this.setState({ eventPageFontColour: colour });
  };

  handleWebsiteBackgroundChange = colour => {
    this.setState({ websiteBackground: colour });
  };

  createStyle = e =>
    fetch("http://localhost:3000/event_styles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        website_colour: this.state.websiteBackground,
        background_colour: this.state.eventPageBackground,
        font_family: this.state.eventPageFontFamily,
        font_colour: this.state.eventPageFontColour,
        event_id: this.state.eventId
      })
    }).then(res => res.json());

  updateStyle = e =>
    fetch(
      `http://localhost:3000/event_styles/${this.state.currentEvent.eventStyle.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          website_colour: this.state.websiteBackground,
          background_colour: this.state.eventPageBackground,
          font_colour: this.state.eventPageFontColour,
          font_family: this.state.eventPageFontFamily
        })
      }
    ).then(res => res.json());

  handleDesignSubmit = e => {
    if (this.state.currentEvent.eventStyle === null) {
      this.createStyle(e);
    } else {
      this.updateStyle(e);
    }
  };

  render() {
    document.body.style.backgroundColor = this.state.websiteBackground;

    const handleDelete = e => {
      API.deleteEvent(e.target.value).then(event => {
        this.props.history.push("/");
      });
    };

    const handleEdit = () => {
      this.props.setEventEdit(this.state.currentEvent);
    };

    const divStyle = {
      background: this.state.eventPageBackground,
      color: this.state.eventPageFontColour,
      fontFamily: this.state.eventPageFontFamily
    };

    const websiteBackground = {
      background: this.state.websiteBackground
    };

    // const eventy = this.props.artist.events.filter(event => {
    //   if (event) {
    //     if (event.id === this.props.chosenEvent) {
    //       return event.id;
    //     }
    //   }
    // });

    return (
      <div className="drop-down-menu">
        {this.state.currentEvent.artist &&
        this.state.currentEvent.artist.id === this.props.artist.id ? (
          <DropDownBars
            handleBackgroundChange={this.handleBackgroundChange}
            handleFontChange={this.handleFontChange}
            handleFontColourChange={this.handleFontColourChange}
            handleWebsiteChange={this.handleWebsiteBackgroundChange}
            handleDesignSubmit={this.handleDesignSubmit}
          />
        ) : null}
        <Grid
          columns={2}
          style={{
            height: "78vh"
          }}
          stretched
          className="event-page"
        >
          <Grid.Row stretched celled style={{ margin: "0" }}>
            <Grid.Column width={10}>
              <Segment style={divStyle}>
                <h1 style={divStyle}>{this.state.currentEvent.title}</h1>
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
                {this.state.currentEvent.artist &&
                this.state.currentEvent.artist.id === this.props.artist.id ? (
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
              <Segment style={divStyle}>
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
              <Segment className="map-div">
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
      </div>
    );
  }
}
