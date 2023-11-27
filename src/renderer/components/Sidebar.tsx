import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useWorkspaces } from '../contexts/WorkspaceProvider';

const Sidebar = () => {
  const { workspaces, fetchWorkspaces } = useWorkspaces();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleWorkspaceNameChange = (event) => {
    setNewWorkspaceName(event.target.value);
  };

  const handleCreateWorkspace = async () => {
    if (newWorkspaceName) {
      try {
        await window.electron.ipcRenderer.invoke('insert-workspace', {
          name: newWorkspaceName,
        });
        fetchWorkspaces();
        handleDialogClose();
      } catch (error) {
        console.error('Database error:', error);
      }
    }
  };

  return (
    <Drawer
      className="sidebar"
      variant="permanent"
      PaperProps={{
        style: { width: '250px' },
      }}
    >
      <Button onClick={handleDialogOpen} fullWidth>
        Add New Workspace
      </Button>
      <List>
        {workspaces.map((workspace, index) => (
          <ListItem key={index}>
            <Button
              component={Link}
              to={`/workspaces/${workspace._id}`}
              fullWidth
            >
              {workspace.name}
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Workspace</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Workspace Name"
            type="text"
            fullWidth
            value={newWorkspaceName}
            onChange={handleWorkspaceNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreateWorkspace}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;
