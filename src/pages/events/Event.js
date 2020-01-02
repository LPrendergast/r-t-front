import React from "react";
// import {
//   Button,
//   CardImg,
//   CardTitle,
//   CardText,
//   CardDeck,
//   CardSubtitle,
//   CardBody
// } from "reactstrap";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

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
    <div class="card" onClick={() => handleClick(id)}>
      <div class="image">
        <img src={image_url} />
      </div>
      <div class="extra content">
        <div class="header">{title}</div>
        <div class="meta">{location}</div>
      </div>
    </div>
  );
};
export default Event;
// CardImg top width="100%" src={image_url} alt="Card image cap" />
// <CardBody>
//   <CardTitle>{title}</CardTitle>
//   <CardSubtitle>
//     <p>
//       {location}, {date}
//     </p>
//   </CardSubtitle>
//   <CardText>{description}</CardText>
//   <Button onClick={() => handleClick(id)}>Event Page</Button>
// </CardBody>
{
  /* <Card.Content onClick={() => handleClick(id)}>
<Card.Header>{title}</Card.Header>
<Image src={image_url} />
<Card.Meta>{location}</Card.Meta>
<Card.Description>
  {description}
</Card.Description>
</Card.Content> */
}
