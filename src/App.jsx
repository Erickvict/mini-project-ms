import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addProject = (projectData) => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      tasks: []
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (projectId, updatedData) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId ? { ...project, ...updatedData } : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const addTask = (projectId, taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString()
    };
    
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, newTask] }
          : project
      )
    );
  };

  const updateTask = (projectId, taskId, updatedData) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map(task =>
                task.id === taskId ? { ...task, ...updatedData } : task
              )
            }
          : project
      )
    );
  };

  const deleteTask = (projectId, taskId) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter(task => task.id !== taskId)
            }
          : project
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Router>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  projects={projects} 
                />
              } 
            />
            <Route 
              path="/projects" 
              element={
                <Projects 
                  projects={projects}
                  addProject={addProject}
                  updateProject={updateProject}
                  deleteProject={deleteProject}
                />
              } 
            />
            <Route 
              path="/projects/:id" 
              element={
                <ProjectDetails 
                  projects={projects}
                  addTask={addTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              } 
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

