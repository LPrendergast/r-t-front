import React from 'react'
import {Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody} from 'reactstrap';
  import {Link  } from "react-router-dom";

const Event = ({
  artist,
  date,
  description,
  image_url,
  location,
  id,
  title,
  handleClick
}) => {
  return (
    <CardDeck>
        <Card>
          <CardImg top width="100%" src={image_url} alt="Card image cap" />
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{location}, {date}</CardSubtitle>
            <CardText>{description}</CardText>
            <Button onClick={handleClick} value={id}>Event Page</Button>
          </CardBody>
        </Card>
      </CardDeck>
)
}
export default Event