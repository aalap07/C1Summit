import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const API_KEY = 'StlUEfYJI8sIZBZPFGZSwb6boSG7aEbXUY9q4lsy';
  const PARK_REQ = `https://developer.nps.gov/api/v1/parks?limit=150&api_key=${API_KEY}`;


  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" />
          <button className="search--button" type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
