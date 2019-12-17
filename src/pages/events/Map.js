import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { DirectionsRenderer, withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcSmT9EYjDiK4u_1NyVGayyvPMiomka2c&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%`}} />
  }),
  withScriptjs,
  withGoogleMap,)(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={new window.google.maps.LatLng(0,0)}
  >
  <Marker position={{ lat: 0, lng: 0}} />
  </GoogleMap>
);

export default class Map extends React.PureComponent {
  state = {
    isMarkerShown: true
  }

  render() {
    return (
      <MyMapComponent
        origin={this.props.origin}
        destination={this.props.destination}
        selectedTransportMode={this.props.selectedTransportMode}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        latitude={this.props.latitude}
        longitude={this.props.longitude}
      />
    )
  }
}
