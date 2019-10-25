import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="background-filler">
      <div className="main-image-div"></div>
      <div className="main-sentence-div">
        <h1>Share your way back home</h1>
      </div>
      <div className="main-button-div">
        <Link to='/login'>
          <button className="btn">Start</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
