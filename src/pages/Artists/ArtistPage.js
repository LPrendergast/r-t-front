import React, {Component} from 'react'
import EventDiv from './EventDiv'


export default class ArtistPage extends Component {
  state={
      artistId: this.props.match.params.id,
      currentArtist: ''
  }

  componentDidMount(){
    fetch(`http://localhost:3000/artists/${this.state.artistId}`)
    .then(res => res.json())
    .then(artist => this.setState({currentArtist: artist}))
  }
    
  render(){

    return(
      <div class='sixteen wide column card' style={{overflow: 'scroll', width: "100%", height: "100%"}}> 
        <h1>{this.state.currentArtist.artist_name}</h1>
        <img src={this.state.currentArtist.image_url} alt="Failed to load." style={{height: '100%', width: '100%'}}/>
        <h1>{this.state.currentArtist.description}</h1>
        <h1><a href={this.state.currentArtist.portfolio} target="_blank" rel='noopener noreferrer'>Portfolio Link</a></h1>
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
