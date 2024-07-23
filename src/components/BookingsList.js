import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        setError('Error fetching bookings');
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const updateBooking = async (bookingId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/bookings/${bookingId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      // Update the booking in the state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? response.data.booking : booking
        )
      );
    } catch (error) {
      setError('Error updating booking');
      console.error('Error updating booking:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <h2>{booking.movie}</h2>
            <p>Theater: {booking.theater}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Seats: {booking.seats.join(', ')}</p>
            <p>Showtime: {booking.showtime}</p>
            {/* Add a button to update the booking */}
            <button onClick={() => updateBooking(booking._id, {/* new booking data */})}>
              Update Booking
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
