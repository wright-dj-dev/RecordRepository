import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CollectionList from './components/collection/CollectionList';
import CollectionPage from './components/collection/CollectionPage';
import Sidebar from './components/Sidebar';
import MainArea from './components/MainArea';
import EditCollectionPage from './components/collection/EditCollectionPage';
import { CollectionProvider } from './contexts/CollectionProvider';

function Dashboard() {
  return (
    <div>
    </div>
  );
}

export default function App() {

  return (
    <CollectionProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/collections" element={<CollectionList />} />
              <Route path="/collections/:collectionId" element={<CollectionPage />} />
              <Route path="/collections/:collectionId/edit" element={<EditCollectionPage />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/records" element={<MainArea />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CollectionProvider>
  );
}
