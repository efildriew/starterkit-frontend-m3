import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

class userLoc extends Component {
  state = {
    location: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
  }
  
  render() {
    const { user } = this.props;
    return (
      <div>
        <h2>Hello {user.username} !</h2>
        <h3>Introduce your current location</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='geoloc'
            placeholder='Current Location'
          />
          <input 
            type='submit'
          />
        </form>
      </div>
    )
  }
}

export default withAuth(userLoc);
