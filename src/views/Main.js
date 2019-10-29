import React, { Component } from 'react';
import MapGL, { NavigationControl, GeolocateControl } from 'react-map-gl';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

// const navStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   padding: '10px'
// };

const locStyle = {
  position: 'absolute',
  bottom: '10%',
  right: '2%',
}

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
        width: '100%',
        height: 500,
      },
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({mounted: true})
  }
  

  _onViewportChange = viewport => this.state.mounted && this.setState({viewport});

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={this._onViewportChange}>
        {/* <div className="nav" style={navStyle}>
          <NavigationControl/>
        </div> */}
        <GeolocateControl
          style={locStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    );
  }
}

export default Map;