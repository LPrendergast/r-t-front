import React, {Component} from 'react'
import EventDiv from './EventDiv'


export default class ArtistPage extends Component {
  state={
      currentArtist: this.props.chosenArtist,
      artistName: this.props.artist_name,
      description: this.props.description,
      image_url: this.props.image_url,
      portfolio: this.props.portfolio,
      username: this.props.username,
      events: this.props.events,
      componentDidMount: true
  }
    
  render(){

    return(
      <div class='sixteen wide column card' style={{overflow: 'scroll', width: "100%", height: "100%"}}> 
        <h1>{this.props.artist_name}</h1>
        <img src={this.props.image_url} alt="Failed to load." style={{height: '100%', width: '100%'}}/>
        <h1>{this.props.description}</h1>
        <h1><a href={this.props.portfolio} target="_blank" rel='noopener noreferrer'>Portfolio Link</a></h1>
        <div>
        <h1>Artist Events</h1>
        {this.props.events ? (this.props.events.map(event => 
        <div>
          <p>{event.title}</p>
          <p>{event.location}</p>
          <p>{event.date}</p>
          <p>{event.image_url}</p>
          <p>{event.description}</p>
          </div>))
        :
        'No Data.'
        }

        </div>
      </div>
    )
  }
}
