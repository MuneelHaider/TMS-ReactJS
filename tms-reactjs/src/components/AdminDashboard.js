import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState({ pending: [], inProgress: [], completed: [] });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/Tasks/user-tasks', {
          headers: { username: localStorage.getItem('username') }
        });
        const tasksData = response.data.reduce((acc, task) => {
          acc[task.status.toLowerCase()].push(task);
          return acc;
        }, { pending: [], inProgress: [], completed: [] });
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5001/Tasks/${taskId}`, {
          headers: { adminUsername: localStorage.getItem('username') }
        });
        setTasks({
          pending: tasks.pending.filter(task => task.id !== taskId),
          inProgress: tasks.inProgress.filter(task => task.id !== taskId),
          completed: tasks.completed.filter(task => task.id !== taskId)
        });
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleShowDetails = (task) => {
    alert(`Title: ${task.title}\nDescription: ${task.description}\nDue Date: ${task.dueDate}\nPriority: ${task.priority}\nStatus: ${task.status}\nCreated By: ${task.createdBy.username}\nAssigned To: ${task.assignedTo.username}`);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="task-buttons">
        <button onClick={() => window.location.href = '/new-task'}>Create Task</button>
        <button onClick={() => window.location.href = '/manage-users'}>Manage Users</button>
      </div>
      <div className="task-columns">
        <div className="task-column">
          <h3>Pending Tasks</h3>
          {tasks.pending.length === 0 ? (
            <p>No pending tasks.</p>
          ) : (
            tasks.pending.map(task => (
              <div key={task.id} className="task">
                <h4>{task.title}</h4>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleShowDetails(task)}>Details</button>
              </div>
            ))
          )}
        </div>
        <div className="task-column">
          <h3>In Progress Tasks</h3>
          {tasks.inProgress.length === 0 ? (
            <p>No in progress tasks.</p>
          ) : (
            tasks.inProgress.map(task => (
              <div key={task.id} className="task">
                <h4>{task.title}</h4>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleShowDetails(task)}>Details</button>
              </div>
            ))
          )}
        </div>
        <div className="task-column">
          <h3>Completed Tasks</h3>
          {tasks.completed.length === 0 ? (
            <p>No completed tasks.</p>
          ) : (
            tasks.completed.map(task => (
              <div key={task.id} className="task">
                <h4>{task.title}</h4>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleShowDetails(task)}>Details</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
