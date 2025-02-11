import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

import journeyService from '../services/journeyService';

import '../styles/Button.css';
import '../styles/Input.css';
import '../styles/Login.css';
import '../styles/UpdateJourney.css';

class UpdateJourney extends Component {
  state = {
    journey: {
      originCoordinates: [],
      originName: '',
      destinationCoordinates: [],
      destinationName: '',
      time: '',
    },
    originPhase: false,
    destinationPhase: false,
    timePhase: false,
  };

  componentDidMount() {
    journeyService.getJourney(this.props.match.params.id).then(response => {
      console.log(response);
      this.setState({
        journey: {
          originCoordinates: [
            response.journey.startLocation.coordinates[1],
            response.journey.startLocation.coordinates[0],
          ],
          originName: response.journey.startLocation.name,
          destinationCoordinates: [
            response.journey.endLocation.coordinates[1],
            response.journey.endLocation.coordinates[0],
          ],
          destinationName: response.journey.endLocation.name,
          time: response.journey.time,
        },
      });
      this.mountMap();
    });
  }

  mountMap = () => {
    const { journey } = this.state;
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [journey.originCoordinates[0], journey.originCoordinates[1]],
      zoom: 14,
    });

    this.map.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: {
        color: 'limegreen',
      },
      mapboxgl,
    });

    document.getElementById('geocoder').appendChild(this.map.geocoder.onAdd(this.map));

    this.map.geocoder.on('result', response => {
      const { originPhase, destinationPhase } = this.state;
      if (originPhase) {
        this.setState({
          journey: {
            ...journey,
            originCoordinates: response.result.geometry.coordinates,
            originName: response.result.place_name,
          },
        });
      } else if (destinationPhase) {
        this.setState({
          journey: {
            ...journey,
            destinationCoordinates: response.result.geometry.coordinates,
            destinationName: response.result.text,
          },
        });
      }
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
    const { journey } = this.state;
    const {
      history: { push },
    } = this.props;
    journeyService.updateJourney(journey, this.props.match.params.id).then(push('/map'));
  };

  handleOriginPhase = () => {
    this.setState({
      originPhase: true,
      destinationPhase: false,
      timePhase: false,
    });
  };

  handleDestinationPhase = () => {
    this.setState({
      originPhase: false,
      destinationPhase: true,
      timePhase: false,
    });
  };

  handleTimePhase = () => {
    this.setState({
      originPhase: false,
      destinationPhase: false,
      timePhase: true,
    });
  };

  render() {
    const mapStyle = {
      width: '100%',
      height: '200px',
    };
    const { originPhase, destinationPhase, timePhase } = this.state;
    return (
      <>
        <div className="center">
          <p>What do you want to change?</p>
        </div>
        <div className="center">
          <button className="btn" name="origin" onClick={this.handleOriginPhase}>
            Origin
          </button>
          <button className="btn" name="destination" onClick={this.handleDestinationPhase}>
            Destination
          </button>
          <button className="btn" name="time" onClick={this.handleTimePhase}>
            Time
          </button>
        </div>
        <div id="map" style={mapStyle} className={`${originPhase || destinationPhase ? 'show' : 'hidden'}`}></div>
        <div id="geocoder" className={`input-wrapper ${originPhase || destinationPhase ? 'show' : 'hidden'}`}></div>
        <form onSubmit={this.onSubmit}>
          {timePhase && (
            <>
              <label>Set the new time!</label>
              <input type="time" name="time" onChange={this.onChange} />
            </>
          )}
          <input className="btn submit" type="submit" style={{ marginTop: `${50}px` }} />
        </form>
      </>
    );
  }
}

export default withAuth(UpdateJourney);
