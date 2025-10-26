import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';

const ProjectDetails = ({ projects, addTask, updateTask, deleteTask }) => {
  const { id } = useParams();
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskStatusFilter, setTaskStatusFilter] = useState('All');

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Project not found</h2>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  const completedTasks = project.tasks.filter(task => task.status === 'Done').length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Filter tasks based on status
  const filteredTasks = project.tasks.filter(task => {
    if (taskStatusFilter === 'All') return true;
    return task.status === taskStatusFilter;
  });

  const handleAddTask = (taskData) => {
    addTask(project.id, taskData);
    setShowAddTaskForm(false);
  };

  const handleEditTask = (taskData) => {
    updateTask(project.id, editingTask.id, taskData);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(project.id, taskId);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Not Started':
        return 'status-not-started';
      case 'In Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <Link to="/projects" className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
            ← Back to Projects
          </Link>
          <h1 style={{ color: 'var(--text-color)', margin: 0 }}>{project.name}</h1>
          <p style={{ color: 'var(--secondary-color)', marginTop: '0.5rem' }}>{project.description}</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddTaskForm(true)}
        >
          + Add Task
        </button>
      </div>

      {/* Project Info */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <strong>Start Date:</strong> {formatDate(project.startDate)}
          </div>
          <div>
            <strong>End Date:</strong> {formatDate(project.endDate)}
          </div>
          <div>
            <strong>Status:</strong> 
            <span className={`status-badge ${getStatusClass(project.status)}`} style={{ marginLeft: '0.5rem' }}>
              {project.status}
            </span>
          </div>
          <div>
            <strong>Total Tasks:</strong> {totalTasks}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Task Completion Progress</span>
            <span>{completedTasks} of {totalTasks} tasks ({Math.round(progress)}%)</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)' }}>Tasks</h3>
          <select
            className="form-control"
            style={{ width: '200px' }}
            value={taskStatusFilter}
            onChange={(e) => setTaskStatusFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {filteredTasks.length > 0 ? (
          <div className="task-list">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No tasks found. {taskStatusFilter !== 'All' ? 'Try changing the filter.' : 'Add your first task to get started!'}</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddTaskForm && (
        <AddTaskForm
          onSave={handleAddTask}
          onCancel={() => setShowAddTaskForm(false)}
        />
      )}

      {editingTask && (
        <AddTaskForm
          task={editingTask}
          onSave={handleEditTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default ProjectDetails;



