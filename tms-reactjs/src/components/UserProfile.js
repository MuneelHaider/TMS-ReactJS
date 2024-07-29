import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [taskCounts, setTaskCounts] = useState(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5001/Account/profile', {
          headers: {
            username: username
          }
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchTaskCounts = async () => {
      try {
        const response = await fetch('http://localhost:5001/Tasks/task-counts', {
          headers: {
            username: username
          }
        });
        const data = await response.json();
        setTaskCounts(data);
      } catch (error) {
        console.error('Error fetching task counts:', error);
      }
    };

    fetchProfile();
    fetchTaskCounts();
  }, [username]);

  if (!profile || !taskCounts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>{profile.username}'s Profile</h2>
      <p><strong>Role:</strong> {profile.role}</p>

      <div className="task-counts">
        <h3>Task Counts</h3>
        <ul>
          {taskCounts.map((taskCount, index) => (
            <li key={index}><strong>{taskCount.status}:</strong> {taskCount.count}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Assigned Tasks</h3>
        {profile.assignedTasks.length > 0 ? (
          <ul>
            {profile.assignedTasks.map(task => (
              <li key={task.id}>
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assigned tasks.</p>
        )}
      </div>

      <div>
        <h3>Created Tasks</h3>
        {profile.createdTasks.length > 0 ? (
          <ul>
            {profile.createdTasks.map(task => (
              <li key={task.id}>
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No created tasks.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
