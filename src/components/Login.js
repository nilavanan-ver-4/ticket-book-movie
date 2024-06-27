import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login successful', res.data);
      alert('Login successful!');
      // Save token to localStorage or context
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Redirect to a protected route after successful login
    } catch (err) {
      console.error('Error logging in', err.response ? err.response.data : err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Type your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">LOGIN</button>
      </form>
      
      <div className="signup-link">
        <p>Don't have an account?</p>
        <Link to="/signup">SIGN UP</Link>
      </div>
    </div>
  );
};

export default Login;
