import React, { useState } from "react";
import API from "../../adapters/API";
import { useHistory } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
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
    <Segment placeholder="placeholder" style={{ background: "white" }}>
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

        <Grid.Column verticalAlign="middle">
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

      <Divider vertical="vertical">Or</Divider>
    </Segment>
  );
};

export default Login;
