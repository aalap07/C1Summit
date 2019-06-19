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
  const [deg, setDeg] = useState("Any");



  const designations = [
    { label: "Any", value: "Any" },
    { label: "National Battlefield", value: "National Battlefield" },
    { label: "National Battlefield Park", value: "National Battlefield Park" },
    { label: "National Battlefield Site", value: "National Battlefield Site" },
    { label: "National Military Park", value: "National Military Park" },
    { label: "National Historical Park", value: "National Historical Park" },
    { label: "National Historic Site", value: "National Historic Site" },
    { label: "International Historic Site", value: "International Historic Site" },
    { label: "National Lakeshore", value: "National Lakeshore" },
    { label: "National Memorial", value: "National Memorial" },
    { label: "National Monument", value: "National Monument" },
    { label: "National Park", value: "National Park" },
    { label: "National Parkway", value: "National Parkway" },
    { label: "National Preserve", value: "National Preserve" },
    { label: "National Reserve", value: "National Reserve" },
    { label: "National Recreation Area", value: "National Recreation Area" },
    { label: "National River", value: "National River" },
    { label: "National Wild and Scenic River", value: "National Wild and Scenic River" },
    { label: "National Wild and Scenic Riverway", value: "National Wild and Scenic Riverway" },
    { label: "National Scenic Trail", value: "National Scenic Trail" },
    { label: "National Seashore", value: "National Seashore" },
    { label: "Affiliated Area", value: "Affiliated Area" },
    { label: "National Heritage Area", value: "National Heritage Area" },
    { label: "National Trails System", value: "National Trails System" },
    { label: "National Wild & Scenic Rivers System", value: "National Wild & Scenic Rivers System" },
  ];

  const states = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "American Samoa", value: "AS" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "District of Columbia", value: "DC" },
    { label: "Federated States of Micronesia", value: "FM" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Guam", value: "GU" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Marshall Islands", value: "MH" },
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
    { label: "Northern Mariana Islands", value: "MP" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Palau", value: "PW" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virgin Islands", value: "VI" },
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
    setParks([]);
    var array = [];
    var trailerIndex = query.indexOf("&Q=");
    if (trailerIndex >= 3){
    
        data.data.map(curr => (
          curr.fullName.toUpperCase().includes(query.substring(0,trailerIndex).toUpperCase()) ? array.push(curr) : array = array
        ))
      
    }
    else if (trailerIndex === 2){
      if (deg === "Any"){
      data.data.map(curr => (
        curr.states.toUpperCase().includes(query.substring(0,2).toUpperCase()) ? array.push(curr) : array = array
      ))
      }
      else{
        data.data.map(curr => (
          curr.states.toUpperCase().includes(query.substring(0,2).toUpperCase()) &&  curr.designation === (deg) ? array.push(curr) : array = array
        ))
        }
      }
    
      count = array.length;
      if (count == 0 && query !== "NULL") {
        if (trailerIndex !== 2){
          window.alert("There are no results for " + query.substring(0,query.indexOf("&Q=")) + ".");
          setSearch('');
        }
        else{
          window.alert("There are no results for " + query.substring(0,query.indexOf("&Q=")) + " with designation " + deg + ".");
        }
      }
      else {
        setParks(array);
        //setDeg("Any");
      }
  }
  
  const stateChange = selectedOption => {
    setSearch(selectedOption.value);
  };

  const degChange = selectedOption => {
    setDeg(selectedOption.value);
  };


  const updateSearch = e => {
    const toSet = e.target.value;
    setSearch(toSet);
  }

  const getSearch = e => {
    setParks([]);
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
      var trailer = "&Q=" + Math.random() * 10 + 1;
      setQuery(search + trailer);
      setParks([]);
     }
  }

  function handleChange(event) {
    setSearch("");
    setDeg("Any");
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
          className="radios"
          control={<Radio color="primary" />}
          label="Name"
          labelPlacement="top"
        />
        <FormControlLabel
          value="states"
          className="radios"
          control={<Radio color="primary" />}
          label="State/Designation"
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

    {type !== "key"? <Select
      className="state-selector"
      placeholder="Designation"
      options={designations}
      onChange={degChange}
    /> : ""}

        <button className="search-button" type="submit">Search</button>
      </form>
     { query !== 'NULL' && query !== '' ?  <p>Showing results for {query.substring(0,query.indexOf("&Q="))}</p> : ""}
     

    <ErrorBoundary> 

      <div className="parks">
        {parks.map(park => (
          <Park
            title={park.fullName}
            parkId={park.id}
            parkCode={park.parkCode}
            desc={park.description}
            states={park.states}
            images={park.images}
            latLong={park.latLong}
            desig={park.designation}
          />
        ))}

      </div>
      </ErrorBoundary> 

    </div>
  );

}



export default App;
