import React, { useEffect, useState } from 'react';
import Park from './Park';
import './App.css';
import Panel from './components/panel/ExpansionPanel';


function App() {

  const API_KEY = 'YaGEFEV7tzcndoKa1RPyeIzKk49dqdUMq26URmFi';
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

      {/* <Header /> */}

      <h1>Welcome to the National Park Service Kiosk </h1>

      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="Enter a park..." value={search} onChange={updateSearch} />
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
          />
          
        ))}
      </div>
    </div>
  );
}

export default App;
