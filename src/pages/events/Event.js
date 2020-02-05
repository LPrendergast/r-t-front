import React from "react";

const Event = ({ image_url, location, id, title, handleClick }) => {
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
