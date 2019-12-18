


import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


const SimpleMap = (props) => {
  const center = {lat: props.latitude, lng: props.longitude }
    const [zoom, setZoom] = useState(13);
    return (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAcSmT9EYjDiK4u_1NyVGayyvPMiomka2c' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={props.latitude}
            lng={props.longitude}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
    );
}

export default SimpleMap;
