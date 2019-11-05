import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

import Home from './views/Home';
import Mapbox from './views/Mapbox';
// import Main from './views/Main';
import MapDirections from './views/Directions';

class App extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <>
        {/* <button onClick={handleLogout}>logout</button> */}
        <Router>
          <AnonRoute exact path="/" component={Home} />
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/map" component={Mapbox} />
          <PrivateRoute exact path="/directions" component={MapDirections} />
          {/* <PrivateRoute exact path="/main" component={Main} /> */}
        </Router>
      </>
    );
  }
}

export default withAuth(App);
