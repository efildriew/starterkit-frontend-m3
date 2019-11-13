import React, { Component } from 'react';

import '../styles/Button.css';

class JourneyDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <p>
          <strong>This journey goes to:</strong>
        </p>
        <p>
          {this.props.destinationLatitude}, {this.props.destinationLongitude}
        </p>
        <p>
          <strong>And departs at:</strong>
        </p>
        <p>{this.props.time}</p>
      </div>
    );
  }
}

export default JourneyDetails;
