import React from 'react';

const Park = ({title, location, parkCode}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{location}</p>
            <p> Parkcode: {parkCode} </p>

            <button onClick ={(e) => {
                handleClick(e, parkCode)}} href="#">More info</button>
        </div> 
    );
}

function handleClick(e, parkCode) {
    e.preventDefault();
    var win = window.open(`https://www.nps.gov/${parkCode}/index.htm`, '_blank');
    win.focus();
   
  }

export default Park;
