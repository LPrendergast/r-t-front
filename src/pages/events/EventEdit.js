import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import Geosuggest from "./Geosuggest";

const EventEdit = props => {
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

  const jsonify = res => {
    // if (!res.ok) throw res;
    return res.json().then(data => {
      if (data.errors) throw data.errors;
      else return data;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3000/events/${props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        date,
        description,
        image_url,
        location,
        title,
        latitude,
        longitude
      })
    })
      .then(jsonify)
      .then(user => {
        history.push(`/events/${props.id}`);
      })
      .catch(errors => {
        setErrors(errors);
        console.error(errors);
      });
  };

  const handleAddress = e => {
    setLocation(e.description);
    setLatitude(e.location.lat);
    setLongitude(e.location.lng);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        type="text"
        placeholder={props.title}
        name="title"
        onChange={e => setTitle(e.target.value)}
        icon="heart"
        iconPosition="left"
        required
      />
      <Form.Input
        type="text"
        placeholder={props.description}
        name="description"
        onChange={e => setDescription(e.target.value)}
        icon="barcode"
        iconPosition="left"
        required
      />
      <Form.Input
        type="url"
        placeholder="Event Banner Image URL"
        name="image"
        onChange={e => setImage(e.target.value)}
        icon="image"
        iconPosition="left"
        required
      />
      <Form.Input
        type="date"
        placeholder="Event Date"
        name="date"
        onChange={e => setDate(e.target.value)}
        icon="time"
        iconPosition="left"
        required
      />
      <Geosuggest
        name="location"
        placeholder={props.location}
        onSubmit={handleAddress}
        icon="location arrow"
        iconPosition="left"
        required
      />
      <Button
        content="Update Event!"
        icon="signup"
        size="big"
        type="submit"
        style={{ background: "light-grey" }}
      />
    </Form>
  );
};

export default EventEdit;
