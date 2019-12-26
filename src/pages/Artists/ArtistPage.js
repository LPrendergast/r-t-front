import React, { Component } from "react";
import EventDiv from "./EventDiv";
// import Helmet from "./Helmet.js";
import DropDownBars from "./DropDownBars.js";

export default class ArtistPage extends Component {
  state = {
    artistId: this.props.match.params.id,
    currentArtist: "",
    bodyBackground: "",
    artistPageBackground: "",
    artistPageFontFamily: "",
    artistPageFontColour: "",
    artistPageEventColour: "",
    websiteBackground: ""
  };

  componentDidMount() {
    fetch(`http://localhost:3000/artists/${this.state.artistId}`)
      .then(res => res.json())
      .then(artist => this.setState({ currentArtist: artist }));
  }

  handleBackgroundChange = colour => {
    this.setState({ artistPageBackground: colour });
  };

  handleFontChange = font => {
    this.setState({ artistPageFontFamily: font });
  };

  handleFontColourChange = colour => {
    this.setState({ artistPageFontColour: colour });
  };

  handleWebsiteBackgroundChange = colour => {
    this.setState({ websiteBackground: colour });
  };

  render() {
    document.body.style.backgroundColor = this.state.websiteBackground;

    const divStyle = {
      backgroundColor: this.state.artistPageBackground,
      color: this.state.artistPageFontColour,
      width: "100%"
    };

    const websiteBackground = {
      background: this.state.websiteBackground
    };

    return (
      <div className="overall">
        <div className="drop-down-menu" style={divStyle}>
          <DropDownBars
            handleBackgroundChange={this.handleBackgroundChange}
            handleFontChange={this.handleFontChange}
            handleFontColourChange={this.handleFontColourChange}
            handleWebsiteChange={this.handleWebsiteBackgroundChange}
          />
          <div className="artist-div">
            <div class="sixteen wide column card" style={divStyle}>
              <h1 style={{ fontFamily: this.state.artistPageFontFamily }}>
                {this.state.currentArtist.artist_name}
              </h1>
              <img
                src={this.state.currentArtist.image_url}
                alt="Failed to load."
                style={{ height: "100%", width: "100%" }}
              />
              <h1 style={{ fontFamily: this.state.artistPageFontFamily }}>
                {this.state.currentArtist.description}
              </h1>
              <h1
                style={{
                  fontFamily: this.state.artistPageFontFamily,
                  divStyle
                }}
              >
                <a
                  href={this.state.currentArtist.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={divStyle}
                >
                  Portfolio Link
                </a>
              </h1>
              <div>
                <h1 style={{ fontFamily: this.state.artistPageFontFamily }}>Artist Events</h1>

                <div className="ui grid test">
                  {this.state.currentArtist
                    ? this.state.currentArtist.events.map(event => (
                        <EventDiv {...event} font={{ fontFamily: this.state.artistPageFontFamily }}/>
                      ))
                    : "Loading Events"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// style={{ divStyle }}
