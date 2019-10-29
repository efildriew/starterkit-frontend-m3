import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

import '../../styles/Login.css';
import '../../styles/Button.css';
import '../../styles/Input.css';

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.handleLogin({
      username,
      password
    })
  }

  render() {
    const { username, password } = this.state;
    return (
      // <form onSubmit={this.handleFormSubmit}>
      //   <label>Username:</label>
      //   <input type="text" name="username" value={username} onChange={this.handleChange}/>
      //   <label>Password:</label>
        // <input type="password" name="password" value={password} on name="username" value={username} onChange={this.handleChange}/>Change={this.handleChange} />
      //   <input type="submit" value="Login" />
      // </form>
      <div className="background">
        <div className="container">
          <div className='input-box'>
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
              <label>E-mail</label>
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
            <div className="button-wrapper">
              <input className='btn' type="submit" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withAuth(Login);