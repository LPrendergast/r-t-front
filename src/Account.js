import React, { useState } from "react";
import API from "./adapters/API";
import { useHistory, Link } from "react-router-dom";
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

const Account = ({
  username,
  id,
  artist_name,
  description,
  image_url,
  portfolio,
  logout
}) => {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleDelete = e => {
    API.deleteArtist(e.target.value)
      .then(artist => {
        history.push("/");
      })
      .catch(errors => {
        console.error(errors);
        setErrors(errors);
      });
  };

  return (
    <div>
      <h1>{artist_name} account details</h1>
      <br />
      <p>Username: {username}</p>
      <div></div>
      <img src={image_url} style={{ width: "100%", height: "100%" }} />
      <a href={portfolio} target="_blank" rel="noopener noreferrer">
        Portfolio Link{" "}
      </a>
      <p>Description: {description}</p>

      <Link to="/account/edit">
        <Button value={id}>Edit Account</Button>
      </Link>
      <Button onClick={handleDelete} value={id}>
        Delete Account
      </Button>

      <Link to="/">
        <Button onClick={logout} value={id}>
          Log Out
        </Button>
      </Link>
    </div>
  );
};
export default Account;
