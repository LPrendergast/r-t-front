import React, {Component} from 'react'
import { Menu,Segment } from 'semantic-ui-react'
import {BrowserRouter as Router,Switch,Route,Redirect,Link,useHistory,NavLink} from "react-router-dom";

 export default class Navbar extends Component{
   state = {activeItem: 'events'}

   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

   render() {
     const { activeItem } = this.state

     return (
       <Segment >
       <Menu stackable secondary >
         <Menu.Item>
           <img src='/logo.png'/>
         </Menu.Item>
         <Menu.Item name='events' position='right'active={activeItem === 'events'} onClick={this.handleItemClick} color='black'>
           <Link to="/">Events</Link>
         </Menu.Item>

         <Menu.Item name='artists'active={activeItem === 'artists'} onClick={this.handleItemClick}>
           <Link to='/Artists'>Artists</Link>
         </Menu.Item>

         <Menu.Item name='sign-in' active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
           {this.props.artist ?<Link to="/"><div onClick={this.props.logout} className='log-out'>Log out</div></Link>:<Link to='/login'>Sign-in/Up</Link>}
         </Menu.Item>

       </Menu>
       </Segment>
     )
   }
 }
 // <Menu.Item name='sign-up' active={activeItem === 'sign-up'} onClick={this.handleItemClick}>
 //   {this.props.artist ? <></>  :<Link to='signup'>Sign-up</Link>}
 // </Menu.Item>