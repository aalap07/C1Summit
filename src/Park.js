import React from 'react';

const Park = ({title, location, parkCode}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{location}</p>
            <p> Parkcode: {parkCode} </p>

        </div> 
    );
}

export default Park;
