
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import facebookIcon from '../assets/icons/facebook.svg';
import twitterIcon from '../assets/icons/twitter.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import user1Icon from '../assets/icons/user1.svg';
import search from '../assets/icons/search.svg';

const Header = () => {
  const [selectedLocation, setSelectedLocation] = useState('Chennai');

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  return (
    <header className="header">
      <div className="home-container">
        <div className="logo">
          <h1>nila movie Tickets</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search for Movies" />
          <button type="button"><a href="#" className='searchimg'><img src={search} alt="Search" /></a></button>
        </div>
        <div className="social-media">
          <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
          <a href="#"><img src={twitterIcon} alt="Twitter" /></a>
          <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
        </div>
        <div className="user-actions">
        <select value={selectedLocation} onChange={handleLocationChange}>
      <option value="Chennai">Chennai</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Delhi">Delhi</option>
      <option value="Kolkata">Kolkata</option>
      {/* Add more options as needed */}
    </select>
          <Link to="/signup"><button type="button"><a href="#"><img src={user1Icon} alt="Accounts" /></a></button></Link>
        </div>
        
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/movies">Movies</Link></li>
          <li className="nav-item"><Link to="/theaters">Theaters</Link></li>
          <li className="nav-item"><Link to="/booking">Booking</Link></li>
          <li className="nav-item"><Link to="/profile">Profile</Link></li>
        </ul>
       
      </nav>
      
    </header>
  );
};

export default Header;
