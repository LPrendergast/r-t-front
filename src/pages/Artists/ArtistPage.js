import React, { Component } from "react";
import EventDiv from "./EventDiv";
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
import { Menu, Grid, Segment } from "semantic-ui-react";
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

  handleId = id => {
    this.props.history.push(`/events/${id}`);
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
          {this.props.artist && this.props.artist.id == this.state.artistId ? (
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
              height: "75vh"
            }}
            stretched
            className="event-page"
          >
            <Grid.Row stretched celled style={{ margin: "0" }}>
              <Grid.Column width={13}>
                <Segment style={divStyle}>
                  <h1 style={{ fontFamily: this.state.artistPageFontFamily }}>
                    {this.state.currentArtist.artist_name}
                  </h1>
                  <p style={{ fontFamily: this.state.artistPageFontFamily }}>
                    {this.state.currentArtist.portfolio
                      ? this.state.currentArtist.portfolio
                      : null}
                    , {this.state.currentArtist.date}
                  </p>
                  <img
                    src={this.state.currentArtist.image_url}
                    alt="Failed to load"
                    style={{ height: "25%", width: "100%" }}
                  />
                  <p style={{fontFamily: this.state.artistPageFontFamily }}>{this.state.currentArtist.description}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}>
                <Segment style={divStyle} className="artist-event-div">
                  {this.state.currentArtist ? (
                    <div class="ui double stackable cards fluid center aligned page">
                      {this.state.currentArtist.events.map(event => (
                        <EventDiv {...event} handleId={this.handleId}/>
                      ))}
                    </div>
                  ) : (
                    "goodbyes"
                  )}
                </Segment>
                {this.props.artist &&
                this.props.artist.id == this.state.artistId ? (
                  <Menu position="right">
                    <Link to="/account/edit">
                      <Button value={this.props.id} style={{fontFamily: this.state.artistPageFontFamily }}>Edit Account</Button>
                    </Link>
                    <Button onClick={handleDelete} value={this.props.id}  style={{fontFamily: this.state.artistPageFontFamily }}>
                      Delete Account
                    </Button>
                  </Menu>
                ) : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
{
  /* <div className="artist-div">
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
                <h1 style={{ fontFamily: this.state.artistPageFontFamily }}>
                  Artist Events
                </h1>

                <div className="ui grid test">
                  {this.state.currentArtist
                    ? this.state.currentArtist.events.map(event => (
                        <EventDiv
                          {...event}
                          font={{ fontFamily: this.state.artistPageFontFamily }}
                          handleId={this.handleId}
                        />
                      ))
                    : "Loading Events"}
                </div>
                {this.props.artist &&
                this.props.artist.id == this.state.artistId ? (
                  <Menu position="right">
                    <Link to="/account/edit">
                      <Button value={this.props.id}>Edit Account</Button>
                    </Link>
                    <Button onClick={handleDelete} value={this.props.id} block>
                      Delete Account
                    </Button>
                  </Menu>
                ) : null}
              </div>
            </div>
          </div> */
}
