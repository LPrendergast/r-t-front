import React, { Component } from "react";
import EventDiv from "./EventDiv";
// import Helmet from "./Helmet.js";
import DropDownBars from "../../components/DropDownBars.js";
import API from "../../adapters/API";
import { Link } from "react-router-dom";
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
      .then(artist => this.setState({ currentArtist: artist }))
      .then(artist =>
        this.state.currentArtist.style != null
          ? this.setState({
              artistPageBackground: this.state.currentArtist.style
                .background_colour,
              artistPageFontFamily: this.state.currentArtist.style.font_family,
              artistPageFontColour: this.state.currentArtist.style.font_colour,
              websiteBackground: this.state.currentArtist.style.website_colour
            })
          : null
      );
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

  createStyle = () =>
    fetch("http://localhost:3000/styles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        website_colour: this.state.websiteBackground,
        background_colour: this.state.artistPageBackground,
        font_colour: this.state.artistPageFontColour,
        font_family: this.state.artistPageFontFamily
      })
    }).then(res => res.json());

  updateStyle = e =>
    fetch(`http://localhost:3000/styles/${this.state.currentArtist.style.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        website_colour: this.state.websiteBackground,
        background_colour: this.state.artistPageBackground,
        font_colour: this.state.artistPageFontColour,
        font_family: this.state.artistPageFontFamily
      })
    }).then(res => res.json());

  handleDesignSubmit = e => {
    if (this.state.currentArtist.style === null) {
      this.createStyle(e);
    } else {
      this.updateStyle(e);
    }
  };

  render() {
    const handleDelete = e => {
      API.deleteArtist(e.target.value).then(artist => {
        this.props.history.push("/");
      });
    };
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
        <div className="drop-down-menu">
          {this.props.artist ? (
            <DropDownBars
              handleBackgroundChange={this.handleBackgroundChange}
              handleFontChange={this.handleFontChange}
              handleFontColourChange={this.handleFontColourChange}
              handleWebsiteChange={this.handleWebsiteBackgroundChange}
              handleDesignSubmit={this.handleDesignSubmit}
            />
          ) : null}

          <div className="artist-div">
            <div class="sixteen wide column card" style={divStyle}>
              <h1 style={{ fontFamily: this.state.artistPageFontFamily }}>
                {this.state.currentArtist.artist_name}
              </h1>
              <Link to="/account/edit">
                <Button value={this.props.id}>Edit Account</Button>
              </Link>
              <Button onClick={handleDelete} value={this.props.id}>
                Delete Account
              </Button>

              <Link to="/">
                <Button onClick={this.props.logout} value={this.props.id}>
                  Log Out
                </Button>
              </Link>
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
                <h1 style={{ fontFamily: this.state.artistPageFontFamily }}>
                  Artist Events
                </h1>

                <div className="ui grid test">
                  {this.state.currentArtist
                    ? this.state.currentArtist.events.map(event => (
                        <EventDiv
                          {...event}
                          font={{ fontFamily: this.state.artistPageFontFamily }}
                        />
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
