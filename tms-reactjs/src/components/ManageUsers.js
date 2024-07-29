import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/Account/non-admin-users', {
          headers: { adminUsername: localStorage.getItem('username') }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5001/Account/delete-user/${userId}`, {
          headers: { adminUsername: localStorage.getItem('username') }
        });
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p><strong>{user.username}</strong> ({user.role})</p>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
