import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const WorkspacePage: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  const fetchWorkspaceData = async () => {
    try {
      const workspaceData = await window.electron.ipcRenderer.invoke('get-workspace', workspaceId) as Workspace;
      setWorkspace(workspaceData);
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, [workspaceId]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>{workspace?.name}</h1>
        <Button component={Link} to={`/workspaces/${workspaceId}/edit`} variant="contained" color="primary">
          Edit Workspace
        </Button>
      </Box>
    </div>
  );
};

export default WorkspacePage;
