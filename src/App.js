import React, { useEffect, useState } from 'react';
import Park from './Park';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header'

function App() {

  const API_KEY = 'StlUEfYJI8sIZBZPFGZSwb6boSG7aEbXUY9q4lsy';
  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');


  useEffect(() => {
    getData();
  }, [query])

  const getData = async () => {

    const response = await fetch(`https://developer.nps.gov/api/v1/parks?limit=10&q=${query}&api_key=${API_KEY}`);
    const data = await response.json();
    setParks(data.data);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (


    <div className="App">

    <Header/>
     
              <h1>Welcome to the National Park Service Kiosk </h1>

            <form onSubmit={getSearch} className="search-form">
              <input className="search-bar" type="text" value={search} onChange={updateSearch} />
              <button className="search-button" type="submit">Search</button>
            </form>
            <div className="parks">
            {parks.map(park => (
              <Park
                title={park.fullName}
                location={park.states}
                parkCode={park.parkCode}
               
              />
            ))}
</div>
          </div>
          );
        }
        
        export default App;
