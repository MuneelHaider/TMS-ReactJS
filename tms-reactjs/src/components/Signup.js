import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/config';
import '../styles/AuthForm.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/Account/register`, {
        username,
        password,
      });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSignup} className="auth-form-box">
        <h2>Signup</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
