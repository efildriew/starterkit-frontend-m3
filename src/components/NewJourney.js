/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

import journeyService from '../services/journeyService';

import '../styles/Button.css';
import '../styles/Input.css';
import '../styles/Login.css';

class NewJourney extends Component {
  state = {
    body: {
      originLatitude: 0,
      originLongitude: 0,
      destinationLatitude: 0,
      destinationLongitude: 0,
      time: 0,
    },
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = e => {
    e.preventDefault();
    const { body } = this.state;
    console.log(body);
    journeyService.createJourney(body).then(res => console.log(res));
  };

  render() {
    const { body } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="input-box">
            <h4>Where are you?</h4>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="input-wrapper">
              <input
                type="number"
                className="input-wrapper-input"
                name="originLatitude"
                value={body.originLatitude}
                onChange={this.onChange}
              />
              <label>Origin Latitude</label>
              <div className="indicator"></div>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                className="input-wrapper-input"
                name="originLongitude"
                value={body.originLongitude}
                onChange={this.onChange}
              />
              <label>Origin Longitude</label>
              <div className="indicator"></div>
            </div>
            <div className="input-box">
              <h4>Where do you want to go?</h4>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                className="input-wrapper-input"
                name="destinationLatitude"
                value={body.destinationLatitude}
                onChange={this.onChange}
              />
              <label>Destination Latitude</label>
              <div className="indicator"></div>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                className="input-wrapper-input"
                name="destinationLongitude"
                value={body.destinationLongitude}
                onChange={this.onChange}
              />
              <label>Destination Longitude</label>
              <div className="indicator"></div>
            </div>
            <div className="input-box">
              <h4>At what time?</h4>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                className="input-wrapper-input"
                name="time"
                value={body.time}
                onChange={this.onChange}
              />
              <label>Time</label>
              <div className="indicator"></div>
            </div>
            <div className="button-wrapper">
              <input className="btn" type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(NewJourney);
