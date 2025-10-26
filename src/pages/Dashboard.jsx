import React from 'react';

const Dashboard = ({ projects }) => {
  // Calculate statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(project => project.status === 'Completed').length;
  
  const allTasks = projects.flatMap(project => project.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(task => task.status === 'Done').length;
  const pendingTasks = allTasks.filter(task => task.status !== 'Done').length;
  
  const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

  // Get recent projects
  const recentProjects = projects
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>Dashboard</h1>
      
      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <div className="number">{totalProjects}</div>
        </div>
        
        <div className="stat-card">
          <h3>Completed Projects</h3>
          <div className="number">{completedProjects}</div>
        </div>
        
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <div className="number">{totalTasks}</div>
        </div>
        
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <div className="number">{pendingTasks}</div>
        </div>
      </div>

      {/* Completion Progress */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Overall Progress</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Project Completion</span>
          <span>{Math.round(completionRate)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', marginBottom: '0.5rem' }}>
          <span>Task Completion</span>
          <span>{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>Recent Projects</h3>
        {recentProjects.length > 0 ? (
          <div className="task-list">
            {recentProjects.map(project => {
              const completedTasks = project.tasks.filter(task => task.status === 'Done').length;
              const totalTasks = project.tasks.length;
              const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

              return (
                <div key={project.id} className="task-item">
                  <div className="task-info">
                    <div className="task-title">{project.name}</div>
                    <div className="task-meta">
                      {project.status} • {completedTasks} of {totalTasks} tasks completed
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <p>No projects yet. Create your first project to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;