import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WorkspaceList from './components/workspace/WorkspaceList';
import WorkspacePage from './components/workspace/WorkspacePage';
import Sidebar from './components/Sidebar';
import EditWorkspacePage from './components/workspace/EditWorkspacePage';
import { WorkspaceProvider } from './contexts/WorkspaceProvider';

function Dashboard() {
  return (
    <div>
    </div>
  );
}

export default function App() {

  return (
    <WorkspaceProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/workspaces" element={<WorkspaceList />} />
              <Route path="/workspaces/:workspaceId" element={<WorkspacePage />} />
              <Route path="/workspaces/:workspaceId/edit" element={<EditWorkspacePage />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </WorkspaceProvider>
  );
}
