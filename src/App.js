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
  //Sets various state variables using hooks for park properties 
  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('NULL');
  const [type, setType] = useState('key');
  const [deg, setDeg] = useState("Any");
  const [lim, setLim] = useState(2);

  /*
  All park data has been taken and stored as a local json for efficiency. In an event
  where new park data is added, this data can also be pulled with an API call.
  */
  const data = require('../src/parks');

  //Array of designations to use for drop down
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

  //Array of states and territories to use for drop down
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

  //Upon every render, we want to get the data with respect to query
  useEffect(() => {
    getData();
  }, [query])


  var count = -1;

  //Method used to get matches
  const getData = async () => {
    setParks([]); //Sets parks to empty array to clear all entries
    var array = []; //Temp array
    var trailerIndex = query.indexOf("&Q="); //Index of appended string used as unique identifier
    if (trailerIndex >= 3) { //If index is greater than or equal to 3, we know it was a name search
      data.map(curr => ( //Adds all matches to temp array
        curr.fullName.toUpperCase().includes(query.substring(0, trailerIndex).toUpperCase()) ? array.push(curr) : array = array
      ))
    }
    else if (trailerIndex === 2) { //If the index is two, we know it was a state search
      if (deg === "Any") { //Add all matches with the state if designation is any
        data.map(curr => (
          curr.states.toUpperCase().includes(query.substring(0, 2).toUpperCase()) ? array.push(curr) : array = array
        ))
      }
      else { //Otherwise, we want to add all matches with that state and designation
        data.map(curr => (
          curr.states.toUpperCase().includes(query.substring(0, 2).toUpperCase()) && curr.designation === (deg) ? array.push(curr) : array = array
        ))
      }
    }
    count = array.length;
    if (count == 0 && query !== "NULL") { //If the array has no matches and the query is not the initial one
      if (trailerIndex !== 2) { //We want to tell the user there have been no matches and reset the search
        window.alert("There are no results for " + query.substring(0, query.indexOf("&Q=")) + ".");
        setSearch('');
      }
      else {
        window.alert("There are no results for " + query.substring(0, query.indexOf("&Q=")) + " with designation " + deg + ".");
      }
    }
    else {
      setParks(array); //Otherwise, we set parks to the temp array with the matches
    }
  }

  //Method used to handle a change in the states dropdown
  const stateChange = selectedOption => {
    setSearch(selectedOption.value);
  };

  //Method used to handle a change in the designation dropdown
  const degChange = selectedOption => {
    setDeg(selectedOption.value);
  };

  //Method used to set the search to the value in the search box upon hitting search
  const updateSearch = e => {
    const toSet = e.target.value;
    setSearch(toSet);
  }

  //Method used to process the user search
  const getSearch = e => {
    setParks([]);
    e.preventDefault();
    if (search.length < 3 && type === "key") {
      if (search.length === 0) { //User has entered nothing. Alert them
        window.alert("Please enter a valid search.");
      }
      else { //User search has not entered enough characters
        window.alert("Your search must be at least 3 characters.");
      }
      setSearch(""); //Reset search to make them try again 
    }
    else {
      //Otherwise, we can append a unique value to the search and set it to query
      //The trailer is used to make sure that two consecutive queries are never identical
      //This ensures that the page does refresh every time
      var trailer = "&Q=" + Math.random() * 10 + 1;
      setQuery(search + trailer);
      setParks([]);
    }
  }

  //Method used to handle a change in the search type. Resets search and deg and changes type appropriately
  function handleRadioChange(event) {
    setSearch("");
    setDeg("Any");
    setType(event.target.value);
  }

  //Method called when show more button is clicked. Increments limit by 2
  function getMore() {
    setLim(lim + 2);
  }

  return (
    <div className="App">
      <Header />
      <br /><br /><br /><br /><br />
      <h1 className="titleText">Welcome to the National Park Service Kiosk </h1>

      <form onSubmit={getSearch} className="search-form">
        {/* Radio button form for search type */}
        <FormControl component="fieldset">
          <RadioGroup aria-label="position" name="position" value={type} onChange={handleRadioChange} row>
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

        {/* Chooses what to render based on user choice from radio button */}
        {type === "key" ? <input className="search-bar" type="text" placeholder="Enter a park name (3+ characters)" value={search} onChange={updateSearch} />
          : <Select
            className="state-selector"
            placeholder="State"
            options={states}
            onChange={stateChange}
          />}
        {type !== "key" ? <Select
          className="state-selector"
          placeholder="Designation (Default is any)"
          options={designations}
          onChange={degChange}
        /> : ""}

        <button className="search-button" type="submit">Search</button>
      </form>
      {/* Text that shows user what they searched for */}
      {query !== 'NULL' && query !== '' ? <p>Showing results for {query.substring(0, query.indexOf("&Q="))}</p> : ""}


      {/* Goes through the parks from 0 to lim and creates a park object for them, causing them to render */}
      <ErrorBoundary>
        <div className="parks">
          {parks.slice(0, lim).map(park => (
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
      {/* If there are more parks not being shown, show the show more button */}
      {parks.length > lim ? <button className="more-button" onClick={getMore}>Show more ({parks.length - lim} left)</button> : ""}
    </div>
  );
}

export default App;
