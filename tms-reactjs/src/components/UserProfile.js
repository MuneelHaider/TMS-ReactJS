import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserProfile.css';
import { BASE_URL } from '../services/config';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [taskCounts, setTaskCounts] = useState({ completed: 0, pending: 0 });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Account/profile`, {
          headers: { username: localStorage.getItem('username') },
        });
        setProfile(response.data);
        const completedTasks = response.data.assignedTasks.filter(task => task.status === 'Completed').length;
        const pendingTasks = response.data.assignedTasks.filter(task => task.status === 'Pending').length;
        setTaskCounts({ completed: completedTasks, pending: pendingTasks });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const username = localStorage.getItem('username');
      await axios.delete(`${BASE_URL}/Account/delete-own-account/${username}`);
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>{profile.username}'s Profile</h2>
      <p><strong>Role:</strong> {profile.role}</p>
      <div className="task-counts">
        <p><strong>Task Counts</strong></p>
        <p>Completed: {taskCounts.completed}</p>
        <p>Pending: {taskCounts.pending}</p>
      </div>
      <div className="tasks">
        <h3>Assigned Tasks</h3>
        {profile.assignedTasks.length === 0 ? (
          <p>No assigned tasks.</p>
        ) : (
          profile.assignedTasks.map(task => (
            <div key={task.id} className="task">
              <h4>{task.title}</h4>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
            </div>
          ))
        )}
        <h3>Created Tasks</h3>
        {profile.createdTasks.length === 0 ? (
          <p>No created tasks.</p>
        ) : (
          profile.createdTasks.map(task => (
            <div key={task.id} className="task">
              <h4>{task.title}</h4>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
            </div>
          ))
        )}
      </div>
      <button className="delete-account-button" onClick={() => setShowDeleteConfirmation(true)}>Delete Account</button>
      {showDeleteConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete your account?</p>
          <button onClick={handleDeleteAccount}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
