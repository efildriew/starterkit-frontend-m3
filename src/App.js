import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

import Home from './views/Home';
import Main from './views/Main';
import userLoc from './views/userLoc';
import Mapbox from './views/Mapbox';

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
          {/* <AnonRoute exact path='/main' component={Main} /> */}
          <PrivateRoute exact path="/main" component={Main} />
          <PrivateRoute exact path="/main/userLoc" component={userLoc} />
          <PrivateRoute exact path="/map" component={Mapbox} />
        </Router>
      </>
    );
  }
}

export default withAuth(App);
