import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import NewTask from './components/NewTask';
import UserProfile from './components/UserProfile';
import ManageUsers from './components/ManageUsers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={role === 'Admin' ? <AdminDashboard /> : <Home />} />
          <Route path="/user-dashboard" element={role === 'User' ? <UserDashboard /> : <Home />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/manage-users" element={<ManageUsers />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
