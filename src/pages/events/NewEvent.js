import React, {useState} from 'react'
import API from '../../adapters/API'
import {useHistory} from 'react-router-dom'
import {Button, Divider, Form, Grid, Segment} from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  NavLink
} from "react-router-dom";
import Geosuggest from './Geosuggest';

const NewEvent = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState([])
  const history = useHistory()

  const handleSubmit = (e) => {
    // e.preventDefault()
    // API.login({title, password}).then(artist => {
    //   console.log(artist)
    //   props.setArtist(artist)
    //   history.push('/')
    // }).catch(errors => {
    //   console.error(errors)
    //   setErrors(errors)
    // })
  }

  return (<Form onSubmit={handleSubmit}>
    <p>{errors.join()}</p>
    <Form.Input type="text" placeholder="Event Title" name="title" value={title} onChange={e => setTitle(e.target.value)} icon="heart" iconPosition='left'/>
    <Form.Input type="text" placeholder="Event Description" name="description" value={description} onChange={e => setDescription(e.target.value)} icon='barcode' iconPosition='left'/>
    <Form.Input type="url" placeholder="Event Banner Image URL" name="image" value={description} onChange={e => setImage(e.target.value)} icon='image' iconPosition='left'/>
    <Form.Input type="date" placeholder="Event Date" name="date" value={date} onChange={e => setDate(e.target.value)} icon='time' iconPosition='left'/>
    <Geosuggest type="location" placeholder="Event Location" name="location" value={location} onChange={e => setLocation(e.target.value)} icon='location arrow' iconPosition='left'/>

    <Link to='/'><Button content='Add Event!' icon='signup' size='big' type='submit' style={{
      background: 'light-grey'
    }}/></Link>
  </Form>)
}

export default NewEvent
