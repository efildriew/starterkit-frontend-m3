import React, { Component } from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import '../styles/Button.css';

class JourneyDetails extends Component {
  render() {
    const history = createBrowserHistory();
    console.log(this.props);
    return (
      <MemoryRouter initialEntries={['/journeys']}>
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
          <Link to={`/journeys/${this.props.id}`}>test</Link>,
        </div>
      </MemoryRouter>
    );
  }
}

export default JourneyDetails;
