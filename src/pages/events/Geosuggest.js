import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Geosugg from 'react-geosuggest';

export default class Geosuggest extends Component{

  state={
    locationObject: []
  }

  render(){

    const onSuggestSelect=(suggest)=> {
        this.props.onChange(suggest)
      }

    return(
      <div>
      <Geosugg ref={el=>this._geoSuggest=el}
          placeholder="Event Location"
          icon='location arrow'
          iconPosition='left'
          onSuggestSelect={onSuggestSelect}
          location={new window.google.maps.LatLng(51.5074, 0.1278)}
          radius="200"
          />

      </div>
    )
  }

}
