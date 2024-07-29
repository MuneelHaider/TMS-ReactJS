import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../services/config';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedTask, setSelectedTask] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const username = localStorage.getItem('username');
                const response = await axios.get(`${BASE_URL}/Tasks/user-tasks`, {
                    headers: {
                        username: username
                    }
                });
                setTasks(response.data);
                setFilteredTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        let filtered = tasks;

        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'All') {
            filtered = filtered.filter(task => task.status === statusFilter);
        }

        setFilteredTasks(filtered);
    }, [searchTerm, statusFilter, tasks]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleTaskStatusChange = async (taskId, newStatus) => {
        try {
            await axios.post(`${BASE_URL}/Tasks/update-status`, {
                taskId: taskId,
                status: newStatus
            });
            
            setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
        } catch (error) {
            console.error('Error updating task status', error);
        }
    };

    const handleTaskDetails = (task) => {
        setSelectedTask(task);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedTask(null);
    };

    return (
        <div className="user-dashboard">
            <h2>User Dashboard</h2>
            <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearch}
            />
            <select value={statusFilter} onChange={handleStatusChange}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
            </select>
            <div className="task-list">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <div key={task.id} className="task-item">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <select
                                value={task.status}
                                onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="InProgress">InProgress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <button onClick={() => handleTaskDetails(task)}>Details</button>
                        </div>
                    ))
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
            {showPopup && selectedTask && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <h2>{selectedTask.title}</h2>
                        <p>{selectedTask.description}</p>
                        <p>Status: {selectedTask.status}</p>
                        <p>Due Date: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                        <p>Priority: {selectedTask.priority}</p>
                        <p>Created By: {selectedTask.createdBy.username}</p>
                        <p>Assigned To: {selectedTask.assignedTo.username}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
