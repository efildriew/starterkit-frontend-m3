import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Router } from 'react-router-dom';

import JourneyDetails from './JourneyDetails';
import journeyService from '../services/journeyService';
import Navbar from '../components/Navbar';
import { withAuth } from '../Context/AuthContext';

import '../styles/Mapbox.css';
import '../styles/Marker.css';

class Mapbox extends Component {
  state = {
    journey: {
      originCoordinates: [],
      originName: '',
      destinationCoordinates: [],
      destinationName: '',
      time: '',
    },
    originPhase: true,
    destinationPhase: false,
    timePhase: false,
    initialLongitude: 41.3977391,
    initialLatitude: 2.1881113,
    mapMounted: false,
  };

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      position => {
        this.mountMap(position.coords.longitude, position.coords.latitude);
        this.setState({
          initialLatitude: position.coords.latitude,
          initialLongitude: position.coords.longitude,
        });
      },
      err => {
        console.log(err);
        this.mountMap();
      },
      options,
    );
  }

  mountMap = (longitude = this.state.initialLongitude, latitude = this.state.initialLatitude) => {
    const { mapMounted } = this.state;
    console.log(longitude, latitude);

    if (mapMounted) {
      this.map.flyTo({
        center: [longitude, latitude],
      });
      return;
    }

    console.log('map being mounted');

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    console.log('fetching user location and creating map');

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 15,
    });

    this.setState({
      journey: {
        originCoordinates: [latitude, longitude],
      },
    });

    console.log('got location and map, creating geolocatecontrol');

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    this.map.addControl(geolocate);

    console.log('got geolocatecontrol, creating geocoder');

    this.map.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
        color: 'limegreen',
      },
      mapboxgl,
    });

    console.log('map created, fetching data');

    document.getElementById('geocoder').appendChild(this.map.geocoder.onAdd(this.map));

    const addPopup = reactElement => {
      const placeholder = document.createElement('div');
      ReactDOM.render(reactElement, placeholder);
      const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(placeholder);
      return popup;
    };

    journeyService.getAllJourneys().then(response => {
      const {
        history: { push },
      } = this.props;
      response.journeys.forEach(journey => {
        console.log(journey);
        const element = document.createElement('div');
        element.className = 'marker';

        new mapboxgl.Marker(element)
          .setLngLat([journey.startLocation.coordinates[1], journey.startLocation.coordinates[0]])
          .setPopup(
            addPopup(
              <>
                <JourneyDetails id={journey._id} name={journey.endLocation.name} time={journey.time} />
                <button
                  onClick={() => {
                    push(`/journeys/${journey._id}`);
                  }}
                >
                  update
                </button>
                <button
                  onClick={() => {
                    journeyService.deleteJourney(journey._id).then(res => {
                      console.log(res);
                      this.map.flyTo({
                        center: [longitude, latitude],
                      });
                    });
                  }}
                >
                  delete
                </button>
              </>,
            ),
          )
          .addTo(this.map);
      });
    });

    this.map.geocoder.on('result', response => {
      console.log(response);
      const { journey, originPhase, destinationPhase } = this.state;
      if (originPhase) {
        this.setState({
          journey: {
            ...journey,
            originCoordinates: response.result.geometry.coordinates,
            originName: response.result.place_name,
          },
          originPhase: false,
          destinationPhase: true,
        });
      } else if (destinationPhase) {
        this.setState({
          journey: {
            ...journey,
            destinationCoordinates: response.result.geometry.coordinates,
            destinationName: response.result.text,
          },
          destinationPhase: false,
          timePhase: true,
        });
      }
    });

    this.map.on('load', () => {
      geolocate.trigger();
      setTimeout(() => {
        this.map.setZoom(15);
      }, 100);
      this.setState({
        mapMounted: true,
      });
      console.log(this.map.geocoder);
      console.log('map mounted');
    });
  };

  onChange = e => {
    const { journey } = this.state;
    this.setState({
      journey: {
        ...journey,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { journey, initialLatitude, initialLongitude } = this.state;
    console.log(journey);
    journeyService.createJourney(journey);
    this.setState({
      journey: {
        originCoordinates: [],
        originName: '',
        destinationCoordinates: [],
        destinationName: '',
        time: '',
      },
      originPhase: true,
      timePhase: false,
    });
    this.mountMap(initialLongitude, initialLatitude);
  };

  render() {
    const mapStyle = {
      width: '100%',
      height: '500px',
    };
    const { user } = this.props;
    const { originPhase, destinationPhase, timePhase } = this.state;
    return (
      <>
        <Navbar />
        <div id="map" style={mapStyle}></div>
        <div>
          <p>Welcome, {user.username}!</p>
          {originPhase && <p>Where do you want to start your journey?</p>}
          {destinationPhase && <p>Where do you want to go?</p>}
          {timePhase && (
            <form onSubmit={this.onSubmit}>
              <label>At which time?</label>
              <input type="time" name="time" onChange={this.onChange} />
              <input type="submit" />
            </form>
          )}
        </div>
        <div id="geocoder" className={`input-wrapper ${!timePhase ? 'show' : 'hidden'}`}></div>
        {/* {!timePhase && <div className="input-wrapper" id="geocoder"></div>} */}
        {/* <div className="btn-new-journey-container">
          <Link to="/journeys">
            <button className="btn btn-new-journey">Create a new Journey!</button>
          </Link>
        </div> */}
      </>
    );
  }
}

export default withAuth(Mapbox);
