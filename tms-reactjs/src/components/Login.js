import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/config';
import '../styles/AuthForm.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/Account/login`, {
        username,
        password,
      });
      if (response.data.message === 'Login successful') {
        localStorage.setItem('username', username);
        localStorage.setItem('role', response.data.user.role);
        window.dispatchEvent(new Event('storage')); // Manually trigger the storage event
        if (response.data.user.role === 'Admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleLogin} className="auth-form-box">
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
