import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onEdit, onDelete }) => {
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

  const completedTasks = project.tasks.filter(task => task.status === 'Done').length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)' }}>{project.name}</h3>
          <span className={`status-badge ${getStatusClass(project.status)}`}>
            {project.status}
          </span>
        </div>
        <p style={{ color: 'var(--secondary-color)', fontSize: '0.875rem', margin: 0 }}>
          {project.description}
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>
          <strong>Dates:</strong> {formatDate(project.startDate)} - {formatDate(project.endDate)}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--secondary-color)' }}>
          <strong>Tasks:</strong> {completedTasks} of {totalTasks} completed
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
        <Link 
          to={`/projects/${project.id}`} 
          className="btn btn-primary btn-sm"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          View Details
        </Link>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(project)}
          style={{ minWidth: '60px' }}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(project.id)}
          style={{ minWidth: '60px' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;