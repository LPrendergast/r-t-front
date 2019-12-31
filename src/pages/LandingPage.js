import React, { Component } from "react";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="ui text container welcome-text">
          <h1 class="ui header" className="welcome-text">
            Welcome to
          </h1>
          <img src="logo.png" class="ui middle aligned large image"></img>
          <h1 class="ui header" className="welcome-text">
            Club
          </h1>
        </div>
      </div>
    );
  }
}
