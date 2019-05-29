import React, { useEffect, useState } from 'react';
import style from './park.module.css';
import Panel from './components/panel/ExpansionPanel';

const API_KEY = 'StlUEfYJI8sIZBZPFGZSwb6boSG7aEbXUY9q4lsy';
const alerts = null;

const Park = ({ title, location, parkCode }) => {
    const getData = async () => {
        const alertResponse = await fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&api_key=${API_KEY}`);
        const alertData = await alertResponse.json();
        console.log(alertData.data);
      }

      useEffect(() => {
        getData();
      }, [])
    
    return (
        <div className={style.park}>
            <h2>{title}</h2>
            <p>{location} <br></br> Parkcode: {parkCode} </p>

            <button onClick={(e) => {
                handleClick(e, parkCode)
            }} href="#">More info</button>
            <p></p>
            <Panel
                parkCode={parkCode}
               
            //Alerts, articles, events, news releases
            />
        </div>
    );
}

function handleClick(e, parkCode) {
    e.preventDefault();
    var win = window.open(`https://www.nps.gov/${parkCode}/index.htm`, '_blank');
    win.focus();

}

export default Park;
