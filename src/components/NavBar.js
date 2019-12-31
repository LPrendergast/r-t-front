import React, { Component } from "react";
import _ from "lodash";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default class Navbar extends Component {
  state = {
    activeItem: "events"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { isLoading, value, results } = this.state;

    return (
      <div className="nav-bar" class="ui main">
        <Segment stackable>
          <Menu stackable secondary="secondary" maxWidth="90" className="thing">
            <Link to="/">
              <Menu.Item>
                <img
                  src="/logo.png"
                  alt=""
                  style={{ height: "15%", width: "15%" }}
                />
              </Menu.Item>
            </Link>
            <Menu.Item
              name="events"
              position="right"
              active={activeItem === "events"}
              onClick={this.handleItemClick}
              color="black"
            >
              <Link to="/events">Events</Link>
            </Menu.Item>

            <Menu.Item
              name="artists"
              active={activeItem === "artists"}
              onClick={this.handleItemClick}
            >
              <Link to="/Artists">Artists</Link>
            </Menu.Item>

            <Menu.Item
              name={this.props.artist ? "New Event" : null}
              active={activeItem === "new-event"}
              onClick={this.handleItemClick}
            >
              {this.props.artist ? <Link to="/newevent">Add Event</Link> : null}
            </Menu.Item>

            {this.props.artist ? null : (
              <Menu.Item onClick={this.handleItemClick}>
                <Link to="/login">Sign-in/Up</Link>
              </Menu.Item>
            )}
            <Menu.Item
              name={this.props.artist ? "account" : null}
              active={activeItem === "Your Account"}
              onClick={this.handleItemClick}
            >
              {this.props.artist ? (
                <Link to="/account">Your Account</Link>
              ) : null}
            </Menu.Item>
            <Menu.Item position="right">
              <SearchBar className="bar" />
            </Menu.Item>
          </Menu>
        </Segment>
      </div>
    );
  }
}
