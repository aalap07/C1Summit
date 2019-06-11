import React, { useEffect, useState } from 'react';
import Park from './components/park/Park';
import './App.css';
import Header from './components/header/Header'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


function App() {
  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('NULL');
  const data = require('../src/parks');
  const [state, setState] = useState('NULL');

  

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

  


  return (
    <div className="App">

      <Header />
      <br /><br /><br /><br /><br />
      <h1 className="titleText">Welcome to the National Park Service Kiosk </h1>

      <form onSubmit={getSearch} className="search-form">
      <FormControl component="fieldset">
      <RadioGroup aria-label="position" name="position" value={"key"} row>
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
        <input className="search-bar" type="text" placeholder="Enter a park name (3+ characters) or state abbr" value={search} onChange={updateSearch} />

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
