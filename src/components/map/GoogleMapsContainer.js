import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { typography } from '@material-ui/core/styles';

const API = "AIzaSyB9Kqn59pkizr4_mHqO8D2EsqP1j73i-zI";
class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      latV: props.lat,
      longV: props.long
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
        width: '20vw',
        height: '25vh',
        'marginLeft': 'auto',
        'marginTop': '1%',
        'marginRight': '77%'

    }
    return (
      <Map
        item
        xs={12}
        style={style}
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={10}
        initialCenter={{ lat: this.state.latV, lng: this.state.longV }}
      >
        <Marker
          onClick={this.onMarkerClick}
          position={{ lat: this.state.latV, lng: this.state.longV }}
        />

      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: (API)
})(GoogleMapsContainer)
