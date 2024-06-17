import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file
import facebookIcon from '../assets/icons/facebook.svg';
import googleIcon from '../assets/icons/google.svg';
import { GoogleLogin } from 'react-google-login';

const clientId = '1051311777803-o3qcfe0ip13bq3ufecqn7cvtuqvj32f7.apps.googleusercontent.com '; // Replace with your actual Google Client ID

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
      // Handle successful login (e.g., store token, navigate to home page)
      navigate('/');
    } catch (err) {
      console.error('Error logging in', err.response ? err.response.data : err);
      alert(err.response ? err.response.data.message : 'Failed to login. Please try again.');
    }
  };
  

  const onSuccess = (response) => {
    console.log('Google Login Success: currentUser:', response.profileObj);
    // Handle the successful login here (e.g., send the user info to your server)
  };

  const onFailure = (response) => {
    console.log('Google Login failed: res:', response);
    alert('Failed to login with Google. Please try again.');
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
        <div className="form-group">
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">LOGIN</button>
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
      <div className="signup-link">
        <p>Don't have an account?</p>
        <Link to="/signup">SIGNUP</Link>
      </div>
    </div>
  );
};

export default Login;
