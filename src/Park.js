import React, { useEffect, useState } from 'react';
import style from './park.module.css';
import Panel from './components/panel/ExpansionPanel';

const API_KEY = 'StlUEfYJI8sIZBZPFGZSwb6boSG7aEbXUY9q4lsy';

const Park = ({ title, location, parkCode, alertData }) => {

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
