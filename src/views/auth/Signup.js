import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

import '../../styles/Button.css';
import '../../styles/Input.css';
import '../../styles/Login.css';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      this.props.handleSignup({
        username,
        password,
      });
    } else {
      alert('Passwords does not match');
    }
  };

  render() {
    const { username, password, confirmPassword } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="input-box">
            <h2>You are a step away of sharing your journey!</h2>
          </div>
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-wrapper-input"
                name="username"
                value={username}
                onChange={this.handleChange}
                required
                autoComplete="off"
              />
              <label>Username</label>
              <div className="indicator"></div>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-wrapper-input"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
                autoComplete="off"
              />
              <label>Password</label>
              <div className="indicator"></div>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-wrapper-input"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                required
                autoComplete="off"
              />
              <label>Repeat Password</label>
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

export default withAuth(Signup);
