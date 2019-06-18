import React from 'react';
import Media from 'react-media';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';


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




    const styleDesktop = {
      width: '20vw',
      height: '25vh',
      'marginLeft': 'auto',
      'marginTop': '1%',
      'marginRight': '77%'
    }

    const styleMobile = {
      width: '60vw',
      height: '25vh',
      'marginTop': '60%',
      'marginLeft': '-30%',
    }

    return (



      <Media query="(max-width: 800px)">
        {matches =>
          matches ? (
            <Map
              item
              xs={12}
              style={styleMobile}
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
          ) : (
              <Map
                item
                xs={12}
                style={styleDesktop}
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
            )
        }
      </Media>









    );
  }
}
export default GoogleApiWrapper({
  apiKey: (API)
})(GoogleMapsContainer)
