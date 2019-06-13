import React, { useEffect, useState } from 'react';
import Park from './components/park/Park';
import './App.css';
import Header from './components/header/Header'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';
import ErrorBoundary from './components/error/ErrorBoundary';

function App() {
  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('NULL');
  const data = require('../src/parks');
  const [type, setType] = useState('key');

  const states = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
  ];

  useEffect(() => {
    getData();
  }, [query])

  var count = -1;
  const getData = async () => {
    var array = [];
    if (query.length >= 3){
      data.data.map(curr => (
        curr.fullName.toUpperCase().includes(query.toUpperCase()) ? array.push(curr) : array = array
      ))
    }
    else if (query.length === 2){
      data.data.map(curr => (
        curr.states.toUpperCase().includes(query.toUpperCase()) ? array.push(curr) : array = array
      ))
    }
      count = array.length;
      if (count == 0 && query !== "NULL") {
        window.alert("There are no results for " + query + ".");
        setSearch('');
      }
      else {
        setParks(array);
      }
  }
  
  const stateChange = selectedOption => {
    setSearch(selectedOption.value);
  };


  const updateSearch = e => {
    const toSet = e.target.value;
    setSearch(toSet);
  }

  const getSearch = e => {
    e.preventDefault();
    if (search.length < 3 && type === "key") {
      if (search.length === 0) {
        window.alert("Please enter a valid search.");
      }
      else {
        window.alert("Your search must be at least 3 characters.");
      }
      setSearch("");
    }
    else {
      setQuery(search);
      setParks([]);
     }
  }

  
  function handleChange(event) {
    setSearch("");
    setType(event.target.value);
  }

  return (
    <div className="App">

      <Header />
      <br /><br /><br /><br /><br />
      <h1 className="titleText">Welcome to the National Park Service Kiosk </h1>

      <form onSubmit={getSearch} className="search-form">

      <FormControl component="fieldset">
      <RadioGroup aria-label="position" name="position" value={type} onChange={handleChange} row>
        <FormControlLabel
          value="key"
          control={<Radio color="primary" />}
          label="Name"
          labelPlacement="top"
        />
        <FormControlLabel
          value="states"
          control={<Radio color="primary" />}
          label="States"
          labelPlacement="top"
        />
       
        
      </RadioGroup>
    </FormControl>
    {type === "key" ? <input className="search-bar" type="text" placeholder="Enter a park name (3+ characters)" value={search} onChange={updateSearch} />
      : <Select
      className="state-selector"
      placeholder="State"
      options={states}
      onChange={stateChange}
    />}

        <button className="search-button" type="submit">Search</button>
      </form>
    <ErrorBoundary> 
      <div className="parks">
        {parks.map(park => (
          <Park
            title={park.fullName}
            parkCode={park.parkCode}
            desc={park.description}
            states={park.states}
            images={park.images}
            latLong={park.latLong}
          />
        ))}

      </div>
      </ErrorBoundary> 

    </div>
  );

}



export default App;
