import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

import '../../styles/Login.css';
import '../../styles/Button.css';
import '../../styles/Input.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    invalidPassword: false,
  };

  handleChange = event => {
    const { name, value } = event.target;
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[&%$]).{6,}$/;
    if (name === 'password' && !regexp.test(value)) {
      console.log(regexp.test(value));
      this.setState({ invalidPassword: true });
    } else if (name === 'password' && regexp.test(value)) {
      this.setState({ invalidPassword: false });
    }
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.handleLogin({
      username,
      password,
    });
  };

  render() {
    const { username, password, invalidPassword } = this.state;
    return (
      <div className="background">
        <div className="container">
          <div className="input-box">
            <h2>Log in to start sharing journeys!</h2>
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
              <label className="input-label">Username</label>
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
              <label className="input-label">Password</label>
              {invalidPassword && (
                <p className="invalid-password">
                  Password must contain at least 6 characters<br></br>an Uppercase, a Lowercase and a Number!
                </p>
              )}
              <div className="indicator"></div>
            </div>
            <div className="button-wrapper">
              <input className="btn" type="submit" disabled={invalidPassword} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
