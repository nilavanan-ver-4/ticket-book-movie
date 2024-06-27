import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = ({ fetchBookings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    movie: '',
    theater: '',
    date: '',
    time: '',
    seats: '',
    showtime: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.post('http://localhost:5000/api/bookings', formData, config);
      console.log('Booking successful', res.data);
      alert('Booking successful!');
      
      setFormData({
        name: '',
        email: '',
        movie: '',
        theater: '',
        date: '',
        time: '',
        seats: '',
        showtime: '',
      });

      fetchBookings();
    } catch (err) {
      console.error('Error booking:', err);
      alert('Error booking');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="booking-form-container">
      <h1>Book Your Tickets</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Movie:
          <select
            name="movie"
            value={formData.movie}
            onChange={handleChange}
            required
          >
            <option value="">Select a Movie</option>
            <option value="Movie 1">Movie 1</option>
            <option value="Movie 2">Movie 2</option>
            <option value="Movie 3">Movie 3</option>
            <option value="Movie 4">Movie 4</option>
          </select>
        </label>
        <label>
          Theater:
          <select
            name="theater"
            value={formData.theater}
            onChange={handleChange}
            required
          >
            <option value="">Select a Theater</option>
            <option value="Theater 1">Theater 1</option>
            <option value="Theater 2">Theater 2</option>
            <option value="Theater 3">Theater 3</option>
            <option value="Theater 4">Theater 4</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Seats:
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            required
          />
        </label>
        
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
