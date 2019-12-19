import React, {Component} from 'react'
import Artist from './Artist.js'
import ArtistPage from './ArtistPage.js'
import { useHistory,Redirect, Link} from "react-router-dom";


export default class Artists extends Component {
  state ={
    artists: [],
    // chosenArtist: ''
  }
  componentDidMount(){
    fetch('http://localhost:3000/artists')
    .then(res => res.json())
    .then(data => this.setState({artists: data}))
  }

  handleClick = id => {
    console.log(this.state.artists.find(artist => artist.id === id))
    const chosenArtist = (this.state.artists.find(artist => artist.id === id))
    console.log(chosenArtist)
    this.props.setChosenArtist(chosenArtist.id)
    this.props.history.push(`/artists/${id}`)
  }

  render(){
    console.log(this.state.artists)
    return(
      <div className='cards-div'>
        {this.state.artists.map(artist => <Artist key={artist.id}{...artist} handleClick={this.handleClick}/>)}
      </div>
    )
  }
}
