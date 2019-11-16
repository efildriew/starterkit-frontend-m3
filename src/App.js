import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Home from './views/Home';
import Mapbox from './views/Mapbox';
import UpdateJourney from './components/UpdateJourney';

class App extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <>
        <Router>
          <AnonRoute exact path="/" component={Home} />
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/map" component={Mapbox} />
          <PrivateRoute exact path="/journeys/:id" component={UpdateJourney} />
        </Router>
      </>
    );
  }
}

export default withAuth(App);
