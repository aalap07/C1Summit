import React, { useEffect, useState } from 'react';
import Park from './components/park/Park';
import './App.css';
import Panel from './components/panel/ExpansionPanel';
import Header from './components/header/Header'

function App() {

  const API_KEY = 'caMDVw2WGfzDThcGxvCSbIneKuTkM5S8YYIhAQJ7';
  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('NULL');
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    getData();
  }, [query])


  const getData = async () => {
    const response = await fetch(`https://developer.nps.gov/api/v1/parks?limit=10&q=${query}&api_key=${API_KEY}`);
    const data = await response.json();
    setParks(data.data);
  }

  const updateSearch = e => {
    const toSet = e.target.value;
    setSearch(toSet);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
    setParks([]);
  }

  var pC;

  const getVisitorData = async () => {
    const response = await fetch(`https://developer.nps.gov/api/v1/visitorcenters?parkCode=${pC}&limit=10&api_key=${API_KEY}`);
    const data = await response.json();
    setVisitors(data.data);
  }

  return (

    <div className="App">

      <Header />
    <br/><br/><br/><br/><br/>
      <h1 className="titleText">Welcome to the National Park Service Kiosk </h1>

      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="Enter a park name..." value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>

      <div className="parks">
        {parks.map(park => (
          <Park
            title={park.fullName}
            location={park.states}
            parkCode={park.parkCode}
            desc={park.description}
            dir={park.directionsUrl}
            states={park.states}
            latLong={park.latLong}
          />

        ))}
      </div>
    </div>
  );
}

export default App;
