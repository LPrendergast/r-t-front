import React, {useState} from 'react'
import API from '../../adapters/API'
import {useHistory} from 'react-router-dom'
import {Button, Form} from 'semantic-ui-react'
import Geosuggest from './Geosuggest';

const NewEvent = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image_url, setImage] = useState('')
  const [location, setLocation] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState([])
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    API.postEvent({title,description,image_url,location,latitude,longitude,date})
    .then(event =>{
      history.push(`/events/${event.id}`)
    })
  }

  const handleAddress = (e) =>{
    setLocation(e.description)
    setLatitude(e.location.lat)
    setLongitude(e.location.lng)
  }

  return (
  <div className="new-event">
  <Form onSubmit={handleSubmit}>
    <p>{errors.join()}</p>
    <Form.Input type="text" placeholder="Event Title" name="title" value={title} onChange={e => setTitle(e.target.value)} icon="heart" iconPosition='left' required/>
    <Form.Input type="text" placeholder="Event Description" name="description" value={description} onChange={e => setDescription(e.target.value)} icon='barcode' iconPosition='left' required/>
    <Form.Input type="url" placeholder="Event Banner Image URL" name="image" value={image_url} onChange={e => setImage(e.target.value)} icon='image' iconPosition='left' required/>
    <Form.Input type="date" placeholder="Event Date" name="date" value={date} onChange={e => setDate(e.target.value)} icon='time' iconPosition='left' required/>
    <Geosuggest placeholder="Event Location" name="location" value={location} onChange={handleAddress} icon='location arrow' iconPosition='left' required/>
    <Button content='Add Event!' icon='signup' size='big' type='submit' style={{background: 'light-grey'}}/>
  </Form>
  </div>
  )
}

export default NewEvent
