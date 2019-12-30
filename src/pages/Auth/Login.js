import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Message,
  Header
} from "semantic-ui-react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    API.login({ username, password })
      .then(artist => {
        console.log(artist);
        props.setArtist(artist);
        history.push("/");
      })
      .catch(errors => {
        console.error(errors);
        setErrors(errors);
      });
  };

  return (
    <div className="login-form">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h1" color="black" textAlign="center">
            <img src="logo.png" alt="logo" className="image" /> Log-in to your
            account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <p>{errors.join()}</p>
            <Segment stacked>
              <Form.Input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                icon="user"
                iconPosition="left"
                maxLength="25"
              />
              <Form.Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                icon="lock"
                iconPosition="left"
                maxLength="50"
              />
              <Button type="submit" value="Log in" fluid size="medium">
                {" "}
                Log in
              </Button>
            </Segment>
          </Form>

          <Link to="signup" className="signup-button">
            <Button
              content="Sign up"
              icon="signup"
              size="medium"
              type="submit"
            />
          </Link>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;

{
  /* <Segment
      placeholder="placeholder"
      style={{ background: "white" }}
      stackable
    >
      <Grid columns={2} relaxed="very" stackable="stackable">
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <p>{errors.join()}</p>
            <Form.Input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              icon="user"
              iconPosition="left"
            />
            <Form.Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon="lock"
              iconPosition="left"
            />
            <Form.Input type="submit" value="Log in" />
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle" stackable>
          <Link to="signup">
            <Button
              content="Sign up"
              icon="signup"
              size="big"
              type="submit"
              style={{ background: "white" }}
            />
          </Link>
        </Grid.Column>
      </Grid>

      <Divider vertical="vertical" stackable>
        Or
      </Divider>
    </Segment> */
}
