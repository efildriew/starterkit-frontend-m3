import React, { Component } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 41.378699,
        longitude: 2.132672,
        zoom: 12,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      }
    };
  }

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}>
        <div className="nav" style={navStyle}>
          <NavigationControl/>
        </div>
      </MapGL>
    );
  }
}

export default Map;