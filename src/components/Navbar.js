import React from 'react';

import { withAuth } from '../Context/AuthContext';
import '../styles/Navbar.css';

const Navbar = props => {
  const { handleLogout } = props;
  return (
    <div className="navbar">
      <img src="https://randomuser.me/api/portraits/men/18.jpg" className="avatar" alt="avatar"></img>
      <ul className="navbar-menu">
        <li className="navbar-item">Profile</li>
        <li className="navbar-item">Favourite Places</li>
        <li className="navbar-item" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default withAuth(Navbar);
