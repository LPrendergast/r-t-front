import React, {Component} from 'react'
import {Menu, Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class Navbar extends Component {
  state = {
    activeItem: 'events'
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state

    return (
    <Segment >
      <Menu stackable="stackable" secondary="secondary">
        <Menu.Item>
          <img src='/logo.png' alt=''/>
        </Menu.Item>
        <Menu.Item name='events' position='right' active={activeItem === 'events'} onClick={this.handleItemClick} color='black'>
          <Link to="/">Events</Link>
        </Menu.Item>

        <Menu.Item name='artists' active={activeItem === 'artists'} onClick={this.handleItemClick}>
          <Link to='/Artists'>Artists</Link>
        </Menu.Item>

        <Menu.Item name='new-event' active={activeItem === 'new-event'} onClick={this.handleItemClick}>
          {
            this.props.artist
              ? <Link to="/newevent">Add Event</Link>
              : null
          }
        </Menu.Item>

        <Menu.Item name='sign-in' active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
          {
            this.props.artist
              ? <Link to="/">
                  <div onClick={this.props.logout} className='log-out'>Log out</div>
                </Link>
              : <Link to='/login'>Sign-in/Up</Link>
          }
        </Menu.Item>

        <Menu.Item name='account' active={activeItem === 'Your Account'} onClick={this.handleItemClick}>
          {
            this.props.artist
              ? <Link to="/account">
                  Your Account
                </Link>
              : null
          }
        </Menu.Item>

      </Menu>
    </Segment>)
  }
}
