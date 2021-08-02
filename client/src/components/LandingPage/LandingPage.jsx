import './App.css';
import React from "react";
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="App">
      <h1>BREAKING BAD WEB</h1>
      
      <Link to='/home'>
        <button className='button'> HOME</button>
      </Link>
     
     
    </div>
  );
}

export default LandingPage;