import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import { Button, Form, Segment, Grid, Header } from "semantic-ui-react";
import Geosuggest from "./Geosuggest";

const NewEvent = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  document.body.style.backgroundColor = "white";

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    API.postEvent({
      title,
      description,
      image_url,
      location,
      latitude,
      longitude,
      date
    }).then(event => {
      history.push(`/events/${event.id}`);
    });
  };

  const handleAddress = e => {
    if (e === undefined) {
      console.log("yup");
    } else {
      setLocation(e.description);
      setLatitude(e.location.lat);
      setLongitude(e.location.lng);
    }
  };

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 600 }}>
        <Header
          as="h2"
          color="black"
          textAlign="center"
          className="event-header"
        >
          <img src="logo.png" alt="logo" className="image" />
          Create Event
        </Header>
        <Segment stacked>
          <Form onSubmit={handleSubmit} style={{ height: "100%" }}>
            <p>{errors.join()}</p>
            <Form.Input
              type="text"
              placeholder="Event Title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              icon="heart"
              iconPosition="left"
              maxLength="100"
              required
            />
            <Form.TextArea
              type="text"
              placeholder="Event Description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              icon="barcode"
              iconPosition="left"
              required
              maxLength="1500"
              style={{ maxHeight: "40vh" }}
              resize
            />
            <Form.Input
              type="url"
              placeholder="Event Banner Image URL"
              name="image"
              value={image_url}
              onChange={e => setImage(e.target.value)}
              icon="image"
              iconPosition="left"
              required
            />
            <Form.Input
              type="date"
              placeholder="Event Date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              icon="time"
              iconPosition="left"
              required
            />
            <Geosuggest
              placeholder="Event Location"
              name="location"
              value={location}
              onSubmit={handleAddress}
              icon="location arrow"
              iconPosition="left"
              required
            />
            <Button
              content="Add Event!"
              icon="signup"
              size="big"
              type="submit"
              style={{ background: "light-grey" }}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default NewEvent;
