import React from 'react';
import '../styles/Login.css';

const FormLogin = () => {
  return (
    <div className="background">
      <div className="container">
        <div className='input-box'>
          <h2>Log in to start sharing journeys!</h2>
        </div>
        <div className="input-wrapper">
          <input
            type="email"
            className="input-wrapper-input"
            name="username"
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
            required
            autoComplete="off"
          />
          <label>Password</label>
          <div className="indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
