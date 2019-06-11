import React, { useEffect, useState } from 'react';
import Park from './components/park/Park';
import './App.css';
import Header from './components/header/Header'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';


function App() {
  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('NULL');
  const data = require('../src/parks');
  const [state, setState] = useState('NULL');
  const [type, setType] = useState('key');

  const states = [
    { label: "AL", value: "AL" },
    { label: "AK", value: "AK" },
    { label: "AZ", value: "AZ" },
    { label: "AR", value: "AR" },
    { label: "CA", value: "CA" },
    { label: "CO", value: "CO" },
    { label: "CT", value: "CT" },
    { label: "DE", value: "DE" },
    { label: "FL", value: "FL" },
    { label: "GA", value: "GA" },
    { label: "HI", value: "HI" },
    { label: "ID", value: "ID" },
    { label: "IL", value: "IL" },
    { label: "IN", value: "IN" },
    { label: "IA", value: "IA" },
    { label: "KS", value: "KS" },
    { label: "KY", value: "KY" },
    { label: "LA", value: "LA" },
    { label: "ME", value: "ME" },
    { label: "MD", value: "MD" },
    { label: "MA", value: "MA" },
    { label: "ME", value: "ME" },
    { label: "MN", value: "MN" },
    { label: "MS", value: "MS" },
    { label: "MO", value: "MO" },
    { label: "MT", value: "MT" },
    { label: "NE", value: "NE" },
    { label: "NV", value: "NV" },
    { label: "NH", value: "NH" },
    { label: "NJ", value: "NJ" },
    { label: "NM", value: "NM" },
    { label: "NY", value: "NY" },
    { label: "NC", value: "NC" },
    { label: "ND", value: "ND" },
    { label: "OH", value: "OH" },
    { label: "OK", value: "OK" },
    { label: "OR", value: "OR" },
    { label: "PA", value: "PA" },
    { label: "RI", value: "RI" },
    { label: "SC", value: "SC" },
    { label: "SD", value: "SD" },
    { label: "TN", value: "TN" },
    { label: "TX", value: "TX" },
    { label: "UT", value: "UT" },
    { label: "VT", value: "VT" },
    { label: "VA", value: "VA" },
    { label: "WA", value: "WA" },
    { label: "WV", value: "WV" },
    { label: "WI", value: "WI" },
    { label: "WY", value: "WY" },
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
    setState(selectedOption);
  };


  //update search with conditional based on value of type
  const updateSearch = e => {
    const toSet = e.target.value;
    setSearch(toSet);

  }

  const getSearch = e => {
    e.preventDefault();
    // if (search.length < 3) {
    //   if (search.length === 0) {
    //     window.alert("Please enter a valid search.");
    //   }
    //   else {
    //     window.alert("Your search must be at least 3 characters.");
    //   }
    //   setSearch("");
    // }
    // else {
      setQuery(search);
      setParks([]);
    // }
  }

  
  function handleChange(event) {
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
          label="Keyword"
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
    </div>
  );

}



export default App;
