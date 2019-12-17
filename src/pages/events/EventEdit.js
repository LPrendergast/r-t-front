import React, {useState} from 'react'
import API from '../../adapters/API'
import {useHistory} from 'react-router-dom'
import {Button, Form} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import Geosuggest from './Geosuggest';

const EventEdit = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image_url, setImage] = useState('')
  const [location, setLocation] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState([])
  const history = useHistory()

  const jsonify = res => {
    // if (!res.ok) throw res;
    return res.json().then(data => {
      if (data.errors)
        throw data.errors;
      else
        return data;
      }
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(props.chosenEvent.id)
    fetch(`http://localhost:3000/events/${props.chosenEvent.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({date,description,image_url,location,title})
    }).then(jsonify)
      .then(user => {
        console.log(user);
        history.push(`/events/${props.chosenEvent.id}`);
      })
      .catch(errors => {
        setErrors(errors);
        console.error(errors);
      });
  };

  const handleAddress = (e) =>{
    setLocation(e.description)
    setLatitude(e.location.lat)
    setLongitude(e.location.lng)
  }

  return (<Form onSubmit={handleSubmit}>
    <Form.Input type="text" placeholder={props.chosenEvent.title} name="title" value={title} onChange={e => setTitle(e.target.value)} icon="heart" iconPosition='left' required/>
    <Form.Input type="text" placeholder={props.chosenEvent.description} name="description" value={description} onChange={e => setDescription(e.target.value)} icon='barcode' iconPosition='left' required/>
    <Form.Input type="url" placeholder="Event Banner Image URL" name="image" value={image_url} onChange={e => setImage(e.target.value)} icon='image' iconPosition='left' required/>
    <Form.Input type="date" placeholder="Event Date" name="date" value={date} onChange={e => setDate(e.target.value)} icon='time' iconPosition='left' required/>
    <Geosuggest placeholder={props.chosenEvent.location} name="location" value={location} onChange={handleAddress} icon='location arrow' iconPosition='left' required/>
    <Button content='Update Event!' icon='signup' size='big' type='submit' style={{background: 'light-grey'}}/>
  </Form>)
}

export default EventEdit
