import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../services/config';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [taskCounts, setTaskCounts] = useState({ pending: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    const fetchTaskCounts = async () => {
      const username = localStorage.getItem('username');
      const response = await axios.get(`${BASE_URL}/Tasks/task-counts`, {
        headers: {
          username: username,
        },
      });
      setTaskCounts(response.data);
    };

    fetchTaskCounts();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="task-count">Pending Tasks: {taskCounts.pending}</div>
      <div className="task-count">In Progress Tasks: {taskCounts.inProgress}</div>
      <div className="task-count">Completed Tasks: {taskCounts.completed}</div>
    </div>
  );
};

export default AdminDashboard;
