import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'To Do':
        return 'status-todo';
      case 'In Progress':
        return 'status-in-progress';
      case 'Done':
        return 'status-done';
      default:
        return '';
    }
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Done';

  return (
    <div className="task-item">
      <div className="task-info">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          <span>Assigned to: <strong>{task.assignedTo}</strong></span>
          <span style={{ marginLeft: '1rem' }}>
            Deadline: 
            <strong style={{ color: isOverdue ? 'var(--danger-color)' : 'inherit' }}>
              {formatDate(task.deadline)}
            </strong>
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className={`status-badge ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
        <div className="task-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;