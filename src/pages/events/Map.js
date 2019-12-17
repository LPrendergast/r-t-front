// import React from "react"
// import { compose, withProps, lifecycle } from "recompose"
// import { DirectionsRenderer, withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import GoogleMapReact from 'google-map-react';


// const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
//
// const MapWithAMarkerWithLabel = compose(
//   withScriptjs,
//   withGoogleMap
// )(props =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     <MarkerWithLabel
//       position={{ lat: -34.397, lng: 150.644 }}
//       labelAnchor={new window.google.maps.Point(0, 0)}
//       labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
//     >
//       <div>Hello There!</div>
//     </MarkerWithLabel>
//   </GoogleMap>
// );
//
// export default class Map extends React.PureComponent {
//   state = {
//     isMarkerShown: true,
//     latitude: this.props.latitude,
//     longitude: this.props.longitude
//   }
//
//   render() {
//     return (
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'add your api key' }}
//           defaultCenter={this.state.latitude, this.state.longitude}
//           defaultZoom={12}
//         >
//
//         </GoogleMapReact>
//       </div>
//     )
//   }
// }



import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


const SimpleMap = (props: any) => {
    const [center, setCenter] = useState({lat: props.latitude, lng: props.longitude });
    const [zoom, setZoom] = useState(13);
    return (
        <div style={{ height: '75vh', width: '100%' }}>
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
      </div>
    );
}

export default SimpleMap;
