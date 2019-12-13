import React, {Component} from 'react'

export default class Main extends Component {
  state ={
    artists: []
  }
  componentDidMount(){
    fetch('http://localhost:3000/artists')
    .then(res => res.json())
    .then(data => console.log(data))
  }
  render(){
    return(
      <div>
        Artists
      </div>
    )
  }
}
