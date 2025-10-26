# Project Management App

A React-based project management application that helps you organize projects and tasks with local storage persistence.

## 🚀 Project Setup Steps

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone or create the project structure**
   ```bash
   mkdir project-management-app
   cd project-management-app
   ```

2. **Initialize React app and install dependencies**
   ```bash
   npx create-react-app .
   npm install react-router-dom
   ```

3. **Create the folder structure**
   ```
   src/
   ├── components/
   │   ├── AddProjectForm.jsx
   │   ├── AddTaskForm.jsx
   │   ├── Header.jsx
   │   ├── ProjectCard.jsx
   │   └── TaskCard.jsx
   ├── pages/
   │   ├── Dashboard.jsx
   │   ├── Projects.jsx
   │   └── ProjectDetails.jsx
   ├── App.jsx
   ├── App.css
   └── index.js
   ```

4. **Copy the component files**
   - Copy all the provided component files into their respective folders
   - Replace the default `App.jsx` with the provided version

5. **Add CSS styles** (create `App.css` with your preferred styling)

6. **Start the development server**
   ```bash
   npm start
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📁 Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── AddProjectForm.jsx
│   ├── AddTaskForm.jsx
│   ├── Header.jsx
│   ├── ProjectCard.jsx
│   └── TaskCard.jsx
├── pages/               # Page-level components
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   └── ProjectDetails.jsx
├── App.jsx             # Main app component with routing
├── App.css             # Application styles
└── index.js            # React entry point
```

## 🎯 Approach & Architecture

### Data Flow Strategy
I implemented a **centralized state management** approach in `App.jsx` where:
- All projects and tasks state is managed at the top level
- Child components receive data and callbacks via props
- LocalStorage operations are handled exclusively in the main App component

### LocalStorage Implementation
**Key Decisions:**
1. **Single Source of Truth**: All data persists in `App.jsx` state
2. **Automatic Persistence**: Data automatically saves to localStorage on every state change
3. **Error Handling**: Added defensive programming to handle corrupted localStorage data
4. **Data Structure**: Used simple key-value pairs with JSON serialization

**Storage Keys:**
- `projects`: Array of project objects with nested tasks
- `darkMode`: Boolean for user's theme preference

### Component Architecture
1. **Presentational Components** (`AddProjectForm`, `ProjectCard`, etc.):
   - Handle UI rendering only
   - No state management or localStorage operations
   - Communicate via callback props

2. **Page Components** (`Dashboard`, `Projects`, `ProjectDetails`):
   - Handle page-level logic and filtering
   - Receive data and operations from App.jsx
   - Maintain local UI state only

3. **App Component**:
   - Centralized state management
   - LocalStorage integration
   - Routing configuration
   - Data operation handlers

### Error Prevention
- **Defensive Programming**: All components check if props are arrays before using array methods
- **Optional Chaining**: Used `?.` operator to safely access nested properties
- **Array Validation**: `Array.isArray()` checks prevent "is not a function" errors
- **Try-Catch Blocks**: Wrapped localStorage operations in error handling

### Key Features
- ✅ **Project Management**: Create, read, update, delete projects
- ✅ **Task Management**: Add tasks to projects with status tracking
- ✅ **Progress Tracking**: Visual progress bars for projects and tasks
- ✅ **Search & Filter**: Filter projects by status, search by name/description
- ✅ **Dark Mode**: Toggleable theme with persistence
- ✅ **Data Persistence**: All data survives browser refresh
- ✅ **Responsive Design**: Works on different screen sizes

## 🛠 Technical Highlights

### State Management
```javascript
// Centralized state in App.jsx
const [projects, setProjects] = useState([]);
const [darkMode, setDarkMode] = useState(false);
```

### LocalStorage Integration
```javascript
// Auto-save on state changes
useEffect(() => {
  localStorage.setItem('projects', JSON.stringify(projects));
}, [projects]);
```

### Defensive Programming
```javascript
// Safe array access in all components
const projectsArray = Array.isArray(projects) ? projects : [];
```

## 🎨 User Interface
- **Dashboard**: Overview with statistics and recent projects
- **Projects**: Grid view with search and filtering
- **Project Details**: Task management within individual projects
- **Modals**: Inline forms for adding/editing projects and tasks

## 🔮 Future Enhancements
- Due date notifications
- Task prioritization
- Data export/import
- User authentication
- Cloud synchronization

---
