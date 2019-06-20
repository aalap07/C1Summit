import React, { useEffect, useState } from 'react'
import style from './park.module.css';
import Panel from '../panel/ExpansionPanel';
import GoogleMapsContainer from '../map/GoogleMapsContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import ErrorBoundary from '../error/ErrorBoundary';
import Alert from '../symbols/safety-caution-alerts-white-22.svg';
import Event from '../symbols/calendar-events-white-22.svg';
import Visitor from '../symbols/visitor-center-white-22.svg';
import News from '../symbols/newspaper-white-22.svg';
import Place from '../symbols/sign-white-22.svg';

//Sets API key for use throughout the file
const API_KEY = 'ddC5geLnts1U91OLj6Ov2xrCAtVWtui9bWUZSTxx';

const Park = ({ title, parkCode, desc, states, latLong, images, desig, parkId }) => {

    //Sets various state variables using hooks for park properties 
    const [visitors, setVisitors] = useState([]);
    const [fees, setFees] = useState([]);
    const [grounds, setGrounds] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [articles, setArticles] = useState([]);
    const [events, setEvents] = useState([]);
    const [news, setNews] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [places, setPlaces] = useState([]);
    const [people, setPeople] = useState([]);
    const [image, setImage] = useState(images.length > 0 ? images[0].url : "https://www.nps.gov/common/commonspot/templates/images/logos/nps_social_image_02.jpg");

    //The next section of functions are API calls for the different park properties
    const getArticleData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/articles?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
            const data = await response.json();
            setArticles(data.data);
        }
        catch (error) {
        }

    }

    const getVisitorData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/visitorcenters?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
            const data = await response.json();
            setVisitors(data.data);
        }
        catch (error) {

        }

    }

    const getAlertData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
            const data = await response.json();
            setAlerts(data.data);
        }
        catch (error) {

        }

    }

    const getGroundsData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&limit=10&api_key=${API_KEY}`);
            const data = await response.json();
            setGrounds(data.data);
        }
        catch (error) {

        }

    }

    const getEventsData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/events?parkCode=${parkCode}&limit=2&api_key=${API_KEY}`);
            const data = await response.json();
            setEvents(data.data);
        }
        catch (error) {

        }

    }

    const getNewsData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/news?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
            const data = await response.json();
            setNews(data.data);
        }
        catch (error) {

        }

    }

    const getLessonsData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/lessonplans?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
            const data = await response.json();
            setLessons(data.data);
        }
        catch (error) {

        }

    }

    const getPlacesData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/places?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
            const data = await response.json();
            setPlaces(data.data);
        }
        catch (error) {

        }

    }

    const getPeopleData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/people?parkCode=${parkCode}&limit=5&api_key=${API_KEY}`);
            const data = await response.json();
            setPeople(data.data);
        }
        catch (error) {

        }

    }

    const getFeesData = async () => {
        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&limit=5&start=0&fields=entranceFees&api_key=${API_KEY}`);
            const data = await response.json();
            setFees(data.data[0].entranceFees);
        }
        catch (error) {

        }

    }

    //We want these functions to run at each render
    useEffect(() => {
        getVisitorData();
        getGroundsData();
        getAlertData();
        getArticleData();
        getEventsData();
        getNewsData();
        getLessonsData();
        getPlacesData();
        getPeopleData();
        getFeesData();
    }, [])

    //Function used to get the index for extracting latitude and longitude data for maps
    function getIndex(initial) {
        for (var i = 0; i < initial.length; i++) {
            if (initial.charAt(i) === ":") {
                return i;
            }
        }
        return -1;
    }
    //Pulls appropriate substring and parses them into floats for use in google maps api
    var latIndex = getIndex(latLong);
    var longIndex = getIndex(latLong.substring(latIndex + 1)) + latIndex + 1;
    const lat = latLong.substring(latIndex + 1, latIndex + 10);
    const long = latLong.substring(longIndex + 1, longIndex + 10);
    var latVal = parseFloat(lat, 10);
    var longVal = parseFloat(long, 10);

    return (
        <ErrorBoundary>
            <div className={style.park}>
                <br />
                {/* Displays title, designation, symbols, states, and google map */}
                <h2 className={style.head}>{title}</h2>
                {desig !== "" ?
                    <h4 className={style.designationLabel}>Designation: {desig}</h4>
                    : ""}

                <div className={style.symbols}>
                    <div className={style.symbolItem}>  {alerts.length !== 0 ? <img src={Alert} title="There are alerts for this park" /> : ""} </div>
                    <div className={style.symbolItem}> {events.length !== 0 ? <img src={Event} /> : ""}</div>
                    <div className={style.symbolItem}>{visitors.length !== 0 ? <img src={Visitor} /> : ""}</div>
                    <div className={style.symbolItem}> {news.length !== 0 ? <img src={News} /> : ""}</div>
                    <div className={style.symbolItem}>{places.length !== 0 ? <img src={Place} /> : ""}</div>
                </div>

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
                {/* If lat and long are provided, make a google maps container, otherwise, show user */}
                {latLong !== "" ? <GoogleMapsContainer
                    lat={latVal}
                    long={longVal}
                /> : <p align="right" style={{ color: 'white' }}> Location coordinates not provided by API. </p>}
                <img className={style.parkImage} src={image} alt="Image" />
                <br /> <br />
                <p></p>
                {/* Creates expansionpanel and passes in all necessary data */}
                <Panel
                    desc={desc}
                    parkId={parkId}
                    parkCode={parkCode}
                    visitors={visitors}
                    grounds={grounds}
                    alerts={alerts}
                    articles={articles}
                    events={events}
                    news={news}
                    lessons={lessons}
                    places={places}
                    people={people}
                    fees={fees}
                />
            </div>
        </ErrorBoundary>
    );
}

export default Park;
