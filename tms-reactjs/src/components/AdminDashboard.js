import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../services/config';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const adminUsername = localStorage.getItem('username');
  const navigate = useNavigate();

  // fetch tasks from api
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/Tasks/user-tasks`, {
          headers: {
            username: adminUsername,
          },
        });

        const tasks = response.data;
        const pending = tasks.filter(task => task.status === 'Pending');
        const inProgress = tasks.filter(task => task.status === 'InProgress');
        const completed = tasks.filter(task => task.status === 'Completed');

        setPendingTasks(pending);
        setInProgressTasks(inProgress);
        setCompletedTasks(completed);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [adminUsername]);

  // handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/Tasks/${taskId}`, {
        headers: {
          adminUsername,
        },
      });
      setPendingTasks(pendingTasks.filter(task => task.id !== taskId));
      setInProgressTasks(inProgressTasks.filter(task => task.id !== taskId));
      setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // view task details in a popup
  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  // close details popup
  const closeDetailsPopup = () => {
    setSelectedTask(null);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/new-task')}>Create Task</button>
      <button onClick={() => navigate('/manage-users')}>Manage Users</button>
      <div className="task-columns">
        <div className="task-column">
          <h3>Pending Tasks</h3>
          {pendingTasks.length === 0 ? (
            <p>No pending tasks.</p>
          ) : (
            pendingTasks.map(task => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button onClick={() => handleViewDetails(task)}>Details</button>
              </div>
            ))
          )}
        </div>
        <div className="task-column">
          <h3>In Progress Tasks</h3>
          {inProgressTasks.length === 0 ? (
            <p>No in progress tasks.</p>
          ) : (
            inProgressTasks.map(task => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button onClick={() => handleViewDetails(task)}>Details</button>
              </div>
            ))
          )}
        </div>
        <div className="task-column">
          <h3>Completed Tasks</h3>
          {completedTasks.length === 0 ? (
            <p>No completed tasks.</p>
          ) : (
            completedTasks.map(task => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
                <button onClick={() => handleViewDetails(task)}>Details</button>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedTask && (
        <div className="task-details-popup">
          <div className="popup-content">
            <h2>{selectedTask.title}</h2>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Due Date:</strong> {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p><strong>Created By:</strong> {selectedTask.createdBy.username}</p>
            <p><strong>Assigned To:</strong> {selectedTask.assignedTo.username}</p>
            <button onClick={closeDetailsPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
