import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface WorkspaceContextValue {
  workspaces: Workspace[];
  fetchWorkspaces: () => Promise<void>;
}

interface WorkspaceProviderProps {
  children: ReactNode;
}

export const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const fetchWorkspaces = async () => {
    try {
      const workspacesData = (await window.electron.ipcRenderer.invoke(
        'get-workspaces',
      )) as Workspace[];
      setWorkspaces(workspacesData);
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <WorkspaceContext.Provider value={{ workspaces, fetchWorkspaces }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaces = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaces must be used within a WorkspaceProvider');
  }
  return context;
};