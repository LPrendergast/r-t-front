import React, {Component} from 'react';
import {Menu, Input} from 'semantic-ui-react';
class Footer extends Component {
  render() {
    return (<div className="footer-thing">
      <Menu className="footer-thing">
        <Menu.Item disabled="disabled" className="footer-thing">
          Created by<a href="https://github.com/LPrendergast" target="_blank" rel='noopener noreferrer'>Luke Prendergast</a>
        </Menu.Item>
      </Menu>
    </div>);
  }
}
export default Footer;