import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';

import journeyService from '../services/journeyService';
import Navbar from '../components/Navbar';
import { withAuth } from '../Context/AuthContext';

import '../styles/Marker.css';

class Mapbox extends Component {
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
        zoom: 10,
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

      journeyService.getAllJourneys().then(journeys => {
        // console.log(journeys);
        journeys.journeys.forEach(marker => {
          // console.log(marker);
          const element = document.createElement('div');
          element.className = 'marker';
          new mapboxgl.Marker(element)
            .setLngLat([marker.latitude, marker.longitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>This Journey departs at:</h3><p>${marker.journeyDate}</p>`),
            )
            .addTo(this.map);
        });
      });

      this.map.geocoder.on('result', result => {
        this.setState({
          latitude: result.result.center[0],
          longitude: result.result.center[1],
        });
      });
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
        <Navbar />
        <div id="map" style={mapStyle}></div>
        <div className="input-wrapper" id="geocoder">
          <p>Welcome, {user.username}! Please, introduce your current location!</p>
        </div>
      </>
    );
  }
}

export default withAuth(Mapbox);
