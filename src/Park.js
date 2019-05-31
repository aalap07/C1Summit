import React, { useEffect, useState } from 'react';
import style from './park.module.css';
import Panel from './components/panel/ExpansionPanel';

const API_KEY = 'StlUEfYJI8sIZBZPFGZSwb6boSG7aEbXUY9q4lsy';

const Park = ({ title, location, parkCode, desc }) => {

    const [visitors, setVisitors] = useState([]);

    const getVisitorData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/visitorcenters?q=${title}&limit=10&api_key=StlUEfYJI8sIZBZPFGZSwb6boSG7aEbXUY9q4lsy`);
        const data = await response.json();
        setVisitors(data.data);
    }
    getVisitorData();

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
                desc={desc}
                visitors={visitors}
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
