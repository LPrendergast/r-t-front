import React, {Component} from 'react'
import Artist from './Artist.js'
import ArtistPage from './ArtistPage.js'
import { useHistory,Redirect, Link} from "react-router-dom";


export default class Artists extends Component {
  state ={
    artists: [],
    chosenArtist: ''
  }
  componentDidMount(){
    fetch('http://localhost:3000/artists')
    .then(res => res.json())
    .then(data => this.setState({artists: data}))
  }

  handleClick = e => {
    fetch(`http://localhost:3000/artists/${e.target.value}`)
    .then(res => res.json())
    .then(artist => this.setState({chosenArtist: artist}, () => this.props.history.push(`/artists/${artist.id}`)))
    .then(() =>this.props.setChosenArtist(this.state.chosenArtist))
  }

  render(){
    return(
      <div className='cards-div'>
        {this.state.artists.map(artist => <Artist key={artist.id}{...artist} handleClick={this.handleClick}/>)}
      </div>
    )
  }
}
