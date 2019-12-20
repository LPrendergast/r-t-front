import React, { Component } from "react";

export default class EventDiv extends Component {
  render() {
    return (
      <div class="ui four wide column">
        <div class="column" style={{ height: "100%", background: "black" }}>
          <div class="ui segment" style={{ background: "black" }}>
            <h4>{this.props.title}</h4>
            <p>{this.props.description}</p>
            <p>{this.props.date}</p>
            <p>{this.props.location}</p>
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
