import React, { Component } from "react";

export default class EventDiv extends Component {
  render() {
    return (
      <div class="ui four wide column">
        <div class="column">
          <div class="ui segment" style={{ height: "100%" }}>
            <h4 style={this.props.font}>{this.props.title}</h4>
            <p style={this.props.font}>{this.props.description}</p>
            <p style={this.props.font}>{this.props.date}</p>
            <p style={this.props.font}>{this.props.location}</p>
            <img
              src={this.props.image_url}
              style={{ height: "100%", width: "100%" }}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}
