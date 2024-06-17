import React from 'react';
import './TheaterDetails.css';

const TheaterDetails = ({ theater }) => {
  return (
    <div className="theater-details">
      <h2>{theater.name}</h2>
      <p>{theater.location}</p>
      <p><strong>Available Movies:</strong> {theater.movies.join(', ')}</p>
    </div>
  );
};

export default TheaterDetails;
