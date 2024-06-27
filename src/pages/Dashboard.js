import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        // Fetch user data
        const userResponse = await axios.get('http://localhost:5000/api/auth/user', config);
        setUser(userResponse.data);

        // Fetch bookings for the user
        const bookingsResponse = await axios.get('http://localhost:5000/api/bookings', config);
        setBookings(bookingsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setLoading(false);
        // Handle logout or redirect to login page on error
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setBookings([]);
    // Optionally redirect to login page
  };

  const handleSaveProfile = async () => {
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

      const res = await axios.put('http://localhost:5000/api/auth/user', user, config);
      console.log('Profile updated:', res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      // Handle error
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <div className="profile-section">
        <h2>User Profile</h2>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="profile-details">
            {isEditing ? (
              <div>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                  />
                </div>
                <button onClick={handleSaveProfile}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p><strong>Full Name:</strong> {user.fullName}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>City:</strong> {user.city}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              </div>
            )}
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </div>

      <div className="bookings-section">
        <h2>Booking History</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : (
          <ul>
            {bookings.map((booking, index) => (
              <li key={index} className="booking-item">
                <p><strong>Movie:</strong> {booking.movie}</p>
                <p><strong>Theater:</strong> {booking.theater}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Seats:</strong> {booking.seats}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
