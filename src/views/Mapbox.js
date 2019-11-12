import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import JourneyDetails from './JourneyDetails';
import journeyService from '../services/journeyService';
import Navbar from '../components/Navbar';
import { withAuth } from '../Context/AuthContext';

import '../styles/Mapbox.css';
import '../styles/Marker.css';
import RouterForwarder from '../Context/RouterForwarder';

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
        zoom: 15,
      });

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      this.map.addControl(geolocate);

      this.map.geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'limegreen',
        },
        mapboxgl,
      });

      document.getElementById('geocoder').appendChild(this.map.geocoder.onAdd(this.map));

      const addPopup = reactElement => {
        const placeholder = document.createElement('div');
        ReactDOM.render(reactElement, placeholder);
        const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(placeholder);
        return popup;
      };

      // const addLinksToPopup = reactElement => {

      // }

      journeyService.getAllJourneys().then(response => {
        const {
          history: { push },
        } = this.props;
        response.journeys.forEach(journey => {
          console.log(journey);
          const element = document.createElement('div');
          element.className = 'marker';

          new mapboxgl.Marker(element)
            .setLngLat([journey.originLatitude, journey.originLongitude])
            .setPopup(
              addPopup(
                <>
                  {/* <Router> */}
                  <JourneyDetails
                    id={journey._id}
                    destinationLatitude={journey.destinationLatitude}
                    destinationLongitude={journey.destinationLongitude}
                    time={journey.time}
                  />
                  <button
                    onClick={() => {
                      push(`/journeys/${journey._id}`);
                    }}
                  >
                    test
                  </button>
                  {/* <Link to={`/journeys/${journey._id}`}>test</Link>, */}
                  {/* </Router> */}
                </>,
              ),
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

      this.map.on('load', () => {
        geolocate.trigger();
        setTimeout(() => {
          this.map.setZoom(15);
        }, 100);
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
        <RouterForwarder context={this.context}>
          <div id="map" style={mapStyle}></div>
        </RouterForwarder>
        <div className="input-wrapper" id="geocoder">
          <p>Welcome, {user.username}! Please, introduce your current location!</p>
        </div>
        <div className="btn-new-journey-container">
          <Link to="/journeys">
            <button className="btn btn-new-journey">Create a new Journey!</button>
          </Link>
        </div>
      </>
    );
  }
}

export default withAuth(Mapbox);
