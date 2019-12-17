import React, {useState} from 'react'
import {Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody} from 'reactstrap';
import {Link, useHistory} from "react-router-dom";
import API from "../../adapters/API";
import { GoogleMap, Marker } from "react-google-maps"
import Map from './Map'


const EventPage = ({date,description,id,image_url,location,title,latitude,longitude}) =>{
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
      <div>
        <Map latitude={latitude} longitude={longitude} />
        <Link to="/event/edit"><Button onClick={handleEdit} value='test'>Edit Event</Button></Link>
        <Button onClick={handleDelete} value={id}>Delete Account</Button>
      </div>
    )

}
export default EventPage
