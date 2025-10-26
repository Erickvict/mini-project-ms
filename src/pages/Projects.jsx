import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import AddProjectForm from '../components/AddProjectForm';

const Projects = ({ projects, addProject, updateProject, deleteProject }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddProject = (projectData) => {
    addProject(projectData);
    setShowAddForm(false);
  };

  const handleEditProject = (projectData) => {
    updateProject(editingProject.id, projectData);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteProject(projectId);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-color)' }}>Projects</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          + Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            className="form-control"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="form-control"
          style={{ width: '200px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={setEditingProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No projects found. Create your first project to get started!</p>
        </div>
      )}

      {/* Modals */}
      {showAddForm && (
        <AddProjectForm
          onSave={handleAddProject}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingProject && (
        <AddProjectForm
          project={editingProject}
          onSave={handleEditProject}
          onCancel={() => setEditingProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;

