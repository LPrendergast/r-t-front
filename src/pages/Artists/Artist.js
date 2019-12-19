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
    <CardDeck>
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
    </CardDeck>
  );
};
export default Artist;
