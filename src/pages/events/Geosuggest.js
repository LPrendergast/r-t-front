import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Geosugg from 'react-geosuggest';

export default class Geosuggest extends Component{
  render(){
    return(
      <div>
      <Geosugg ref={el=>this._geoSuggest=el}
          placeholder="Event Location"
          icon="location"
          onSuggestSelect={this.onSuggestSelect}
          location={new window.google.maps.LatLng(51.5074, 0.1278)}
          radius="200" />
      </div>
    )
  }

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect(suggest) {
    console.log(suggest);
  }
}
