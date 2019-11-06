import React, { Component } from 'react';
import MapGL, { Marker, GeolocateControl } from 'react-map-gl';

import '../styles/Input.css';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 0,
        longitude: 0,
        zoom: 14,
        bearing: 0,
        pitch: 0,
        width: '100%',
        height: 500,
      },
      mounted: false,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          viewport: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 14,
            bearing: 0,
            pitch: 0,
            width: '100%',
            height: 500,
          },
          mounted: true,
        });
      },
      err => console.log(err),
    );
  }

  _onViewportChange = viewport => this.state.mounted && this.setState({ viewport });

  getUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          viewport: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 14,
            bearing: 0,
            pitch: 0,
            width: '100%',
            height: 500,
          },
        });
      },
      err => console.log(err),
    );
  };

  render() {
    if (this.state.latitude === 0) {
      return <div>Loading...</div>;
    }
    const { viewport } = this.state;
    return (
      <>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={this._onViewportChange}
        >
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            // offsetLeft={-20}
            // offsetTop={-10}
          >
            <div>You are here!</div>
          </Marker>
          <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
        </MapGL>
        <button onClick={this.getUserPosition}>Find Me!</button>
        <div className="input-wrapper">
          <input type="text" className="input-wrapper-input" name="search" />
          <label>Where do you want to go?</label>
        </div>
      </>
    );
  }
}

export default Map;
