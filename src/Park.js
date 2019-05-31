import React, { useEffect, useState } from 'react';
import style from './park.module.css';
import Panel from './components/panel/ExpansionPanel';

const API_KEY = 'NbNl7f8G2SaGHJWLhTRShe9uw1GHgJetnXsxn2SA';

const Park = ({ title, location, parkCode, desc }) => {

    const [visitors, setVisitors] = useState([]);
    const [grounds, setGrounds] = useState([]);
    const [alerts, setAlerts] = useState([]);


    const getVisitorData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/visitorcenters?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
        const data = await response.json();
        setVisitors(data.data);
    }

    const getAlertData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
        const data = await response.json();
        setAlerts(data.data);
       
    }


    const getGroundsData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
        const data = await response.json();
        setGrounds(data.data);
    }

    const update = e => {
        getVisitorData();
        getGroundsData();
      }
    

    useEffect(() => {
        getVisitorData();
        getGroundsData();
        getAlertData();
    }, [])


   


    return (

        <div className={style.park} onChange={update}>

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
                grounds={grounds}
                alerts={alerts}
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
