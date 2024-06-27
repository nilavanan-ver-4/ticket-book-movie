import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

// anotherFile.js





const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    address: '',
    city: '',
    country: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/user');
        setUserData(res.data);
      } catch (err) {
        console.error('Error fetching user data', err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put('http://localhost:5000/api/auth/user', userData);
      console.log('User data updated successfully', res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user data', err);
    }
  };
  const [userInfo, setUserInfo] = useState({
    username: 'example_user',
    email: 'example@example.com',
    password: '********', // This should be hidden or masked
    fullName: 'Example User',
    age: 25,
    gender: 'Male',
    address: '123 Example St, City, Country',
  });

  // Assuming you have a function to handle form submission
const handleSubmit = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/user', userInfo);
    console.log(res.data);
    // Handle success
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="profile-item">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="profile-item">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="profile-item">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="profile-item">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="profile-item">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={userData.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="profile-item">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={userData.country}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="profile-buttons">
        {isEditing ? (
          <button onClick={handleSave}>Save Changes</button>
        ) : (
          <button onClick={handleEdit}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
