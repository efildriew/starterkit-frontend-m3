/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

class NewJourney extends Component {
  state = {
    originLatitude: 0,
    originLongitude: 0,
    destinationLatitude: 0,
    destinationLongitude: 0,
    time: 0,
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit() {}

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="number" name="originLatitude" onChange={this.onChange}></input>
          <input type="number" name="originLongitude" onChange={this.onChange}></input>
          <input type="number" name="destinationLatitude" onChange={this.onChange}></input>
          <input type="number" name="destinationLongitude" onChange={this.onChange}></input>
          <input type="number" name="time" onChange={this.onChange}></input>
        </form>
      </div>
    );
  }
}

export default withAuth(NewJourney);
