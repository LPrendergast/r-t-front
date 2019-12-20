import React, { Component } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { SketchPicker } from "react-color";

export default class DropDownBars extends Component {
  state = {
    backgroundColour: "",
    fontFamily: "",
    fontColour: ""
  };

  handleBackgroundChange = color => {
    this.setState({ backgroundColour: color.hex });
  };

  handleFontColourChange = color => {
    this.setState({ fontColour: color.hex });
  };

  handleFontSubmit = e => {
    this.setState({ fontFamily: e.target.innerText });
  };


  render() {
   
    return (
      <Menu>
        <Dropdown text="Background Colour" pointing className="link item">
          <Dropdown.Menu>
            <SketchPicker
              color={this.state.backgroundColour}
              onChangeComplete={this.handleBackgroundChange}
            />
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown text="Font Family" pointing className="link item">
          <Dropdown.Menu onClick={this.handleFontSubmit}>
            <div role="option" class="item">
              Arial
            </div>
            <div role="option" class="item">
              Arial Black
            </div>
            <div role="option" class="item">
              Roboto
            </div>
            <div role="option" class="item">
              Times New Roman
            </div>
            <div role="option" class="item">
              Times
            </div>
            <div role="option" class="item">
              Courier New
            </div>
            <div role="option" class="item">
              Verdana
            </div>
            <div role="option" class="item">
              Georgia
            </div>
            <div role="option" class="item">
              Palatino
            </div>
            <div role="option" class="item">
              Garamond
            </div>
            <div role="option" class="item">
              Bookman
            </div>
            <div role="option" class="item">
              Comic Sans
            </div>
            <div role="option" class="item">
              Candara
            </div>
            <div role="option" class="item">
              Impact
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown text="Font Colour" pointing className="link item">
          <Dropdown.Menu>
            <SketchPicker
              color={this.state.backgroundColour}
              onChangeComplete={this.handleFontColourChange}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}
