import React, { Component } from "react";
import EventDiv from "./EventDiv";
import { Helmet } from "react-helmet";
import Application from "./Helmet.js";

export default class ArtistPage extends Component {
  state = {
    artistId: this.props.match.params.id,
    currentArtist: ""
  };

  componentDidMount() {
    fetch(`http://localhost:3000/artists/${this.state.artistId}`)
      .then(res => res.json())
      .then(artist => this.setState({ currentArtist: artist }));
  }

  render() {
    return (
      <div
        class="sixteen wide column card"
        style={{ overflow: "scroll", width: "100%" }}
      >
        <h1>{this.state.currentArtist.artist_name}</h1>
        <img
          src={this.state.currentArtist.image_url}
          alt="Failed to load."
          style={{ height: "100%", width: "100%" }}
        />
        <h1>{this.state.currentArtist.description}</h1>
        <h1>
          <a
            href={this.state.currentArtist.portfolio}
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio Link
          </a>
        </h1>
        <div></div>
        <div>
          <h1>Artist Events</h1>

          <div class="ui grid">
            {this.state.currentArtist
              ? this.state.currentArtist.events.map(event => (
                  <EventDiv {...event} />
                ))
              : "Loading Events"}
          </div>
        </div>
        <div>
          <Application />
        </div>
      </div>
    );
  }
}
