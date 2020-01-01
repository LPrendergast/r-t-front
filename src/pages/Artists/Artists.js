import React, { Component } from "react";
import Artist from "./Artist.js";
import ReactDOM from "react-dom";

export default class Artists extends Component {
  state = {
    artists: []
  };
  componentDidMount() {
    fetch("http://localhost:3000/artists")
      .then(res => res.json())
      .then(data => this.setState({ artists: data }));
  }

  handleClick = id => {
    const chosenArtist = this.state.artists.find(artist => artist.id === id);
    this.props.setChosenArtist(chosenArtist.id);
    this.props.history.push(`/artists/${id}`);
  };

  render() {
    document.body.style.backgroundColor = "white";

    return (
      <div>
        <div class="ui four doubling stackable cards center aligned page grid">
          {this.state.artists.map(artist => (
            <Artist
              key={artist.id}
              {...artist}
              handleClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}
