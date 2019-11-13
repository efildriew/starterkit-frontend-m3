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

  componentDidMount() {
    console.log(this.props.match.params.id);
    console.log(this.props);
    journeyService.getJourney(this.props.match.params.id).then(response => {
      console.log(response);
      this.setState({
        body: {
          originLatitude: response.journey.originLatitude,
          originLongitude: response.journey.originLongitude,
          destinationLatitude: response.journey.destinationLatitude,
          destinationLongitude: response.journey.destinationLongitude,
          time: response.journey.time,
        },
      });
    });
  }

  onChange = e => {
    const { body } = this.state;
    this.setState({
      body: {
        ...body,
        [e.target.name]: e.target.value,
      },
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { body } = this.state;
    console.log(body);
    const {
      history: { push },
    } = this.props;
    journeyService.updateJourney(body, this.props.match.params.id).then(push('/map'));
  };

  render() {
    console.log(this.props);
    const { originLatitude, originLongitude, destinationLatitude, destinationLongitude, time } = this.state.body;
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
                value={originLatitude}
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
                value={originLongitude}
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
                value={destinationLatitude}
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
                value={destinationLongitude}
                onChange={this.onChange}
              />
              <label>Destination Longitude</label>
              <div className="indicator"></div>
            </div>
            <div className="input-box">
              <h4>At what time?</h4>
            </div>
            <div className="input-wrapper">
              <input type="number" className="input-wrapper-input" name="time" value={time} onChange={this.onChange} />
              <label>Time</label>
              <div className="indicator"></div>
            </div>
            <div className="button-wrapper">
              <input className="btn" type="submit" value="Update!" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(NewJourney);
