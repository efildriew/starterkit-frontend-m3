import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '../styles/Mapbox.css';

class Mapbox extends Component {
  state = {
    longitude: 0,
    latitude: 0,
  }
  
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

      this.map.geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'limegreen',
        },
        mapboxgl,
      });

      document.getElementById('geocoder').appendChild(this.map.geocoder.onAdd(this.map));
      this.map.geocoder.on('result', (result) => {
        this.setState = {
          latitude: result.result.center[0],
          longitude: result.result.center[1]
        }
        console.log(result.result.center);
     })
     
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const mapStyle = {
      width: '100%',
      height: '500px',
    };
    return (
      <>
        <div id="map" style={mapStyle}></div>
        <div className="input-wrapper" id="geocoder">
        </div>
      </>
    );
  }
}

export default Mapbox;
