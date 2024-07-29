import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    setUsername(storedUsername);
    setRole(storedRole);
  }, []);

  const handleHomeClick = () => {
    if (username && role) {
      if (role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUsername(null);
    setRole(null);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        TMS
      </div>
      <div className="navbar-links">
        {username ? (
          <div className="navbar-user">
            Hello, {username} <span className="arrow" onClick={toggleDropdown}>▼</span>
            {dropdownOpen && (
              <div className="dropdown">
                <Link to="/user-profile" onClick={() => setDropdownOpen(false)}>View Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
