import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import facebookIcon from '../assets/icons/facebook.svg';
import googleIcon from '../assets/icons/google.svg';
import { GoogleLogin } from 'react-google-login';

const clientId = '1051311777803-o3qcfe0ip13bq3ufecqn7cvtuqvj32f7.apps.googleusercontent.com';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
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
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration successful', res.data);
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Error registering user', err.response ? err.response.data : err);
    }
  };

  const onSuccess = (response) => {
    console.log('Login Success: currentUser:', response.profileObj);
  };

  const onFailure = (response) => {
    console.log('Login failed: res:', response);
    alert('Failed to login. Please try again.');
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            name="fullName"
            placeholder="Type your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user-name">Username</label>
          <input
            type="text"
            id="user-name"
            name="username"
            placeholder="Type your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Type your email address"
            value={formData.email}
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
        <button type="submit">SIGN UP</button>
      </form>
      <div className="social-login">
        <p>Or Sign Up Using</p>
        <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <img src={googleIcon} alt="Google" />
            </a>
          )}
        />
      </div>
      <div className="login-link">
        <p>Already have an account?</p>
        <Link to="/login">LOGIN</Link>
      </div>
    </div>
  );
};

export default Signup;
