import React, { useState } from "react";
import API from "./adapters/API";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody
} from "reactstrap";

const AccountEdit = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [artist_name, setArtistName] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [id, setId] = useState("");
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
    console.log(props.id);
    fetch(`http://localhost:3000/artists/${props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        artist_name,
        description,
        image_url,
        portfolio,
        username,
        password
      })
    })
      .then(jsonify)
      .then(user => {
        console.log(user);
        props.setArtist(user);
        history.push("/account");
      })
      .catch(errors => {
        setErrors(errors);
        console.error(errors);
      });
  };

  return (
    <div className="page-login">
      <div className="ui centered grid container">
        <div className="nine wide column">
          <div className="ui icon message">
            <div className="content">
              <h1 align="center">Edit Artist Account</h1>
              <div className="header">{!errors ? "Signup failed!" : null}</div>
            </div>
          </div>
          <div className="ui fluid card">
            <div className="content">
              <form
                onSubmit={handleSubmit}
                className="ui form"
                value={props.id}
              >
                <div className="field">
                  <input
                    type="text"
                    placeholder={props.username}
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                  <div className="field">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="text"
                      placeholder={
                        props.artist_name ? props.artist_name : "Artist Name"
                      }
                      name="artistName"
                      value={artist_name}
                      onChange={e => setArtistName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="text"
                      placeholder={
                        props.description
                          ? props.description
                          : "Artist Description"
                      }
                      name="description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="url"
                      placeholder={
                        props.image_url ? props.image_url : "Image Url of Work"
                      }
                      name="artwork"
                      value={image_url}
                      onChange={e => setImage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <input
                      type="url"
                      placeholder={
                        props.portfolio ? props.portfolio : "Portfolio Link"
                      }
                      name="portfolio"
                      value={portfolio}
                      onChange={e => setPortfolio(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" value={props.id}>
                    Edit Account
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountEdit;
