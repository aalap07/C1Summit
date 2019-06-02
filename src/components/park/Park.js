import React, { useEffect, useState } from 'react';
import style from './park.module.css';
import Panel from '../panel/ExpansionPanel';
import GoogleMapsContainer from '../map/GoogleMapsContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const API_KEY = 'caMDVw2WGfzDThcGxvCSbIneKuTkM5S8YYIhAQJ7';

const Park = ({ title, location, parkCode, desc, dir, states, latLong }) => {

    const [visitors, setVisitors] = useState([]);
    const [grounds, setGrounds] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [articles, setArticles] = useState([]);
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);


    const getArticleData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/articles?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
        const data = await response.json();
        setArticles(data.data);
    }

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

    const getEventsData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/events?parkCode=${parkCode}&limit=2&api_key=${API_KEY}`);
        const data = await response.json();
        setEvents(data.data);
    }

    const getNewsData = async () => {
        const response = await fetch(`https://developer.nps.gov/api/v1/news?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
        const data = await response.json();
        setNews(data.data);
    }

    useEffect(() => {
        getVisitorData();
        getGroundsData();
        getAlertData();
        getArticleData();
        getEventsData();
        getNewsData();
    }, [])


    const lat = (latLong[4] + latLong[5] + latLong[6] + latLong[7] + latLong[8] + latLong[9] +
        latLong[10] + latLong[11] + latLong[12] + latLong[13]);
        
    const long = (latLong[22] + latLong[23] + latLong[24] + latLong[25] + latLong[26] + latLong[27] +
        latLong[28] + latLong[29] + latLong[30] + latLong[31]);
        
        const latF = parseFloat(lat, 10);
        const longF = parseFloat(long, 10);
    return (


        <div className={style.park}>
            <br />

            <h2 className={style.head}>{title}</h2>
            <div className={style.mapIcon}>
                <FontAwesomeIcon
                    color="white"
                    icon={faMapMarkerAlt}
                    size="3x"

                />
                <div className={style.locLabel}>

                    <p>{states}</p>
                </div>
            </div>


            <GoogleMapsContainer
                latV = {latF}
                longV = {longF}
            />
            <img className={style.parkImage} src={"https://www.readingviaduct.org/wp-content/uploads/2018/06/Schaefer-Park-Playground-1024x675.jpg"} alt="Logo" />
            <br /> <br />
            {/* <button onClick={(e) => {
                handleClick(e, parkCode, dir)
            }}>Directions</button> */}
            <p></p>
            <Panel
                desc={desc}
                parkCode={parkCode}
                visitors={visitors}
                grounds={grounds}
                alerts={alerts}
                articles={articles}
                events={events}
                news={news}
            />


        </div>
    );
}

function handleClick(e, parkCode, dir) {
    e.preventDefault();
    var win = window.open(`${dir}`, '_blank');
    win.focus();

}

export default Park;
