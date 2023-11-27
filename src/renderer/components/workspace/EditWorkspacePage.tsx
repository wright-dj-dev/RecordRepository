import React, { useEffect, useState, useCallback, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useWorkspaces } from '../../contexts/WorkspaceProvider';
import { Grid, Container, styled } from '@mui/material';

const RootContainer = styled(Container)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const EditWorkspacePage: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const navigate = useNavigate();
  const { fetchWorkspaces } = useWorkspaces();

  const handleSuccess = useCallback(() => {
    fetchWorkspaces();
    navigate('/workspaces');
  }, [fetchWorkspaces, navigate]);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const workspaceData = (await window.electron.ipcRenderer.invoke(
          'get-workspace',
          workspaceId,
        )) as Workspace;
        setWorkspace(workspaceData);
      } catch (error) {
        console.error('Database error:', error);
      }
    };

    fetchWorkspaceData();
  }, [workspaceId]);

  const handleWorkspaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (workspace) {
      setWorkspace({ ...workspace, name: event.target.value });
    }
  };

  const handleUpdateWorkspace = async () => {
    if (workspace) {
      try {
        await window.electron.ipcRenderer.invoke('update-workspace', {
          _id: workspace._id,
          name: workspace.name,
        });
        handleSuccess();
      } catch (error) {
        console.error('Database error:', error);
      }
    }
  };

  const handleDeleteWorkspace = async () => {
    try {
      await window.electron.ipcRenderer.invoke('delete-workspace', {
        _id: workspaceId,
      });
      handleSuccess();
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  return (
    <RootContainer>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Workspace Name"
            value={workspace?.name || ''}
            onChange={handleWorkspaceNameChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button onClick={handleUpdateWorkspace} variant="contained" color="primary">
            Update Workspace
          </Button>
          <Button onClick={handleDeleteWorkspace} color="secondary">
            Delete Workspace
          </Button>
        </Grid>
      </Grid>
    </RootContainer>
  );
};

export default EditWorkspacePage;
