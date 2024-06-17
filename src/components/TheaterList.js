import React, { useState } from 'react';
import './TheaterList.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const theaters = [
  // Add your theater data here
  {
    name: 'Cinema 1',
    location: 'Downtown',
    shows: ['Show 1', 'Show 2', 'Show 3'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 2',
    location: 'Uptown',
    shows: ['Show 4', 'Show 5', 'Show 6'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 3',
    location: 'Downtown',
    shows: ['Show 1', 'Show 2', 'Show 3'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 4',
    location: 'Uptown',
    shows: ['Show 4', 'Show 5', 'Show 6'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 5',
    location: 'Downtown',
    shows: ['Show 1', 'Show 2', 'Show 3'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 6',
    location: 'Uptown',
    shows: ['Show 4', 'Show 5', 'Show 6'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 7',
    location: 'Downtown',
    shows: ['Show 1', 'Show 2', 'Show 3'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 8',
    location: 'Uptown',
    shows: ['Show 4', 'Show 5', 'Show 6'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 9',
    location: 'Downtown',
    shows: ['Show 1', 'Show 2', 'Show 3'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 10',
    location: 'Uptown',
    shows: ['Show 4', 'Show 5', 'Show 6'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 11',
    location: 'Downtown',
    shows: ['Show 1', 'Show 2', 'Show 3'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  },
  {
    name: 'Cinema 12',
    location: 'Uptown',
    shows: ['Show 4', 'Show 5', 'Show 6'],
    image: 'https://via.placeholder.com/300x200', // Replace with actual image URLs
  }
  
  // Add more theater objects as needed
];

const TheaterList = () => {
  const [theaterData, setTheaterData] = useState(theaters);
  const navigate = useNavigate();
  const handlebookClick = (movie) => {
    navigate('/booking-page', { state: { movie } });
  };

  return (
    <div className="theater-list">
      <h1></h1>
      <ul>
        {theaterData.map((theater, index) => (
          <li key={index} className="theater-item"onClick={() => handlebookClick()}>
            <img src={theater.image} alt={theater.name} className="theater-image" />
            <h2>{theater.name}</h2>
            <p>{theater.location}</p>
            <ul className="show-list">
              {theater.shows.map((show, idx) => (
                <li key={idx}>{show}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TheaterList;
