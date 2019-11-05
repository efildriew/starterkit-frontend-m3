import mapboxgl from 'mapbox-gl';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

class MapDirections extends Component {
  state = {
    longitude: 0,
    latitude: 0,
  };

  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    navigator.geolocation.getCurrentPosition(position => {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 15,
      });
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
      );

      this.map.directions = new Directions({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
      });

      document.getElementById('geocoder').appendChild(this.map.directions.onAdd(this.map));
      // this.map.geocoder.on('result', result => {
      //   this.setState({
      //     latitude: result.result.center[0],
      //     longitude: result.result.center[1],
      //   });
      // });
    });
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: '500px',
    };
    const { user } = this.props;
    return (
      <>
        <div id="map" style={mapStyle}></div>
        <div className="input-wrapper" id="geocoder">
          <p>Welcome, {user.username}! Please, introduce your current location!</p>
        </div>
      </>
    );
  }
}

export default withAuth(MapDirections);
