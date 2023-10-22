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
import { useCollections } from '../contexts/CollectionProvider';

type Collection = {
  _id?: string;
  name: string;
};

const Sidebar = () => {
  const { collections, fetchCollections } = useCollections();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCollectionNameChange = (event) => {
    setNewCollectionName(event.target.value);
  };

  const handleCreateCollection = async () => {
    if (newCollectionName) {
      try {
        await window.electron.ipcRenderer.invoke('insert-collection', {
          name: newCollectionName,
        });
        fetchCollections();
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
        Add New Collection
      </Button>
      <List>
        {collections.map((collection, index) => (
          <ListItem key={index}>
            <Button
              component={Link}
              to={`/collections/${collection._id}`}
              fullWidth
            >
              {collection.name}
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Collection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={newCollectionName}
            onChange={handleCollectionNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreateCollection}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;
