import React, {Component} from 'react'
import Event from './Event.js'
import EventPage from './EventPage.js'
import { useHistory,Redirect, Link} from "react-router-dom";


export default class Events extends Component {
  state ={
    events: [],
    chosenEvent: ''
  }
  componentDidMount(){
    fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(data => this.setState({events: data}))
  }

  handleClick = e => {
    fetch(`http://localhost:3000/events/${e.target.value}`)
    .then(res => res.json())
    .then(event => this.setState({chosenEvent: event}, () => this.props.history.push(`/events/${event.id}`)))
    .then(() =>this.props.setChosenEvent(this.state.chosenEvent))
  }

  render(){
    return(
      <div className='cards-div'>
        {this.state.events.map(event => <Event key={event.id}{...event} handleClick={this.handleClick}/>)}
      </div>
    )
  }
}
