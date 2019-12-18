import React, {useState,useEffect} from 'react'
import {Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody} from 'reactstrap';
import {Link, useHistory} from "react-router-dom";
import API from "../../adapters/API";
import Map from './Map'


const EventPage = ({date,description,id,image_url,location,title,latitude,longitude,artist}) =>{
  const [errors, setErrors] = useState([]);
  const history = useHistory()

    const handleEdit = (e) =>{
      console.log(e)
    }

    const handleDelete = (e) =>{
      console.log(e.target.value)
      API.deleteEvent(e.target.value).then( event =>{
          history.push('/')
      }).catch(errors => {
        console.error(errors)
        setErrors(errors)
      })
    }
    return(
      <div class='ui grid' style={{height: '75vh',width: '100%'}}>
        <div class="ten wide column">
        <h1>{title}</h1>
        <p>{location ? location : null}, {date}</p>
        <img src="image_url" alt='Image Failed to load'/>
        </div>
        <div class="six wide column">
        <h1>Event Creator:</h1>
        {artist ? (
          <div>
            <p>{artist.artist_name}</p>
            <p>{artist.description}</p>
            <p>{artist.image_url}</p>
            <p>{artist.portfolio}</p>
          </div> 
          )
          : 'goodbyes'
          }
        </div>
        <div class="ten wide column">
        <Link to="/event/edit"><Button onClick={handleEdit} value='test'>Edit Event</Button></Link>
        <Button onClick={handleDelete} value={id}>Delete Event</Button>
        </div>
        <div class="six wide column">
        <Map latitude={latitude} longitude={longitude} style={{height: '100%', width: '100%'}}/>
        </div>
      </div>
    )

}
export default EventPage
