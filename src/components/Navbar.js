import React from 'react';

import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="https://randomuser.me/api/portraits/men/18.jpg" className="avatar" alt="avatar"></img>
      <ul className="navbar-menu">
        <li className="navbar-item">Profile</li>
        <li className="navbar-item">Favourite Places</li>
        <li className="navbar-item">Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
