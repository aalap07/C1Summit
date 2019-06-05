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
    const response = await fetch(`https://developer.nps.gov/api/v1/parks?limit=100&q=${query}&fields=images&api_key=${API_KEY}`);
    const data = await response.json();
    var array = [];
    {data.data.map(curr => (
      curr.fullName.toUpperCase().startsWith(query.toUpperCase()) ? array.push(curr) : array = array
    ))}
    setParks(array);
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
            images={park.images}
            latLong={park.latLong}
          />

        ))}
      </div>
    </div>
  );
}

export default App;
