import React, { Component } from "react";

export default class EventDiv extends Component {
  render() {
    const handleClick = e => {
      this.props.handleId(this.props.id);
    };
    return (
      <div
        class="card"
        onClick={() => handleClick()}
        style={{ background: this.props.websiteBackground }}
      >
        <div class="image">
          <img
            src={this.props.image_url}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <div class="extra content">
          <div class="header" style={{ fontFamily: this.props.font }}>
            {this.props.title}
          </div>
          <div class="meta" style={{ fontFamily: this.props.font }}>
            {this.props.location}
          </div>
          <div class="meta" style={{ fontFamily: this.props.font }}>
            {this.props.date}
          </div>
          {/* <div class="description" style={{ fontFamily: this.props.font }}>
            {this.props.description}
          </div> */}
        </div>
      </div>
    );
  }
}

// <div class="ui four wide column">
//       <div class="column">
//         <div
//           class="ui segment artist-event"
//           style={{ height: "100%" }}
//           onClick={handleClick}
//         >
//           <h4 style={this.props.font}>{this.props.title}</h4>
//           <p style={this.props.font}>{this.props.description}</p>
//           <p style={this.props.font}>{this.props.date}</p>
//           <p style={this.props.font}>{this.props.location}</p>
//           <img
//             src={this.props.image_url}
//             style={{ height: "100%", width: "100%" }}
//           ></img>
//         </div>
//       </div>
//     </div>
