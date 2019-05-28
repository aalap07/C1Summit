import React from 'react';
import style from './park.module.css';

const Park = ({title, location, parkCode}) => {
    return (
        <div className={style.park}>
            <h2>{title}</h2>
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
