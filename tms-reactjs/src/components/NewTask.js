import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NewTask.css';
import { BASE_URL } from '../services/config';

const NewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);

  // fetch users from api
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Account/non-admin-users`, {
          headers: { username: localStorage.getItem('username') }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // handle form submission to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      createdBy: localStorage.getItem('username')
    };
    try {
      await axios.post(`${BASE_URL}/Tasks/assign`, task, {
        headers: { adminUsername: localStorage.getItem('username') }
      });
      alert('Task created successfully');
      window.location.href = '/admin-dashboard';
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="new-task-container">
      <h2>create task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">select priority</option>
            <option value="High">high</option>
            <option value="Medium">medium</option>
            <option value="Low">low</option>
          </select>
        </div>
        <div>
          <label>assign to</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="">select user</option>
            {users.map(user => (
              <option key={user.id} value={user.username}>{user.username}</option>
            ))}
          </select>
        </div>
        <button type="submit">create task</button>
      </form>
    </div>
  );
};

export default NewTask;
