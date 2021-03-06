import React, { useState } from "react";
import API from "../../adapters/API";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Message,
  Header
} from "semantic-ui-react";

const Signup = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [artist_name, setArtistName] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  document.body.style.backgroundColor = "white";

  const handleSubmit = e => {
    e.preventDefault();
    API.signup({
      artist_name,
      description,
      image_url,
      portfolio,
      username,
      password
    })
      .then(user => {
        console.log(user);
        props.setArtist(user);
        history.push("/");
      })
      .catch(errors => {
        setErrors(errors);
        console.error(errors);
      });
  };
  return (
    <div className="login-form">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h1" color="black" textAlign="center">
            <img src="logo.png" alt="logo" className="image" /> Create an
            account
          </Header>
          <Segment stacked>
            <Form size="large" onSubmit={handleSubmit}>
              <p>{errors.join()}</p>
              <div className="field">
                <Form.Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  maxLength="25"
                />
                <div className="field">
                  <Form.Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    maxLength="50"
                  />
                </div>
                <div className="field">
                  <Form.Input
                    type="text"
                    placeholder="Artist Name"
                    name="artistName"
                    value={artist_name}
                    onChange={e => setArtistName(e.target.value)}
                    required
                    maxLength="100"
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Artist Description"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    maxLength="500"
                  />
                </div>
                <div className="field">
                  <Form.Input
                    type="url"
                    placeholder="Picture of Art Work"
                    name="artwork"
                    value={image_url}
                    onChange={e => setImage(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <Form.Input
                    type="url"
                    placeholder="Portfolio Link"
                    name="portfolio"
                    value={portfolio}
                    onChange={e => setPortfolio(e.target.value)}
                    required
                    maxLength="500"
                  />
                </div>
                <Button
                  type="submit"
                  value="Create Account"
                  fluid
                  size="medium"
                >
                  {" "}
                  Log in
                </Button>
              </div>
            </Form>
          </Segment>

          <Link to="/login" className="signup-button" icon="signup">
            <Button
              content="Sign up"
              icon="signup"
              size="medium"
              type="submit"
              // style={{ color: "grey" }}
            >
              Already Signed-up? Login Here.
            </Button>
          </Link>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Signup;
