import React from "react";
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

const Artist = ({
  username,
  artist_name,
  portfolio,
  image_url,
  description,
  id,
  handleClick
}) => {
  return (
    <div class="card" onClick={() => handleClick(id)}>
    <div class="image">
      <img src={image_url} />
    </div>
    <div class="extra content">
      <div class="header">{artist_name}</div>
      <div class="meta">{portfolio}</div>
      <div class="description">{description}</div>
    </div>
  </div>
  );
};
export default Artist;
{/* <CardDeck>
<Card>
  <CardImg top width="100%" src={image_url} alt="Card image cap" />
  <CardBody>
    <CardTitle>{artist_name}</CardTitle>
    <CardSubtitle>
      <a href={portfolio} target="_blank" rel="noopener noreferrer">
        Portfolio Link{" "}
      </a>
    </CardSubtitle>
    <CardText>{description}</CardText>
    <Button onClick={() => handleClick(id)}>Artist Page</Button>
  </CardBody>
</Card>
</CardDeck> */}