
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from './components/BookingForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Theaters from './pages/Theaters';
import Booking from './pages/Booking';
import MovieList from './components/MovieList';
import TheaterList from './components/TheaterList';
import BookingPage from './components/BookingPage';
import UserProfile from './pages/UserProfile';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import BookingsList from './components/BookingsList';

import './App.css';

const App = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/theaters" element={<Theaters />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/movie-list" element={<MovieList />} />
            <Route path="/theater-list" element={<TheaterList />} />
            <Route path="/booking-page" element={<BookingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<BookingsList />} />
       
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
