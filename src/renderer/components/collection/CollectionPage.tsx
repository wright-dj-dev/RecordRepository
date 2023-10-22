import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';



const CollectionPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [records, setRecords] = useState<CollectionRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRecordData, setNewRecordData] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRecordData, setEditRecordData] = useState('');
  const [editRecordId, setEditRecordId] = useState<string | null>(null);

  const fetchCollectionData = async () => {
    try {
      const collectionData = await window.electron.ipcRenderer.invoke('get-collection', collectionId) as Collection;
      setCollection(collectionData);
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const recordsData = await window.electron.ipcRenderer.invoke('get-records', collectionId) as CollectionRecord[];
      setRecords(recordsData);
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  useEffect(() => {
    fetchCollectionData();
    fetchRecords();
  }, [collectionId]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleRecordDataChange = (event) => {
    setNewRecordData(event.target.value);
  };

  const handleCreateRecord = async () => {
    if (newRecordData) {
      try {
        await window.electron.ipcRenderer.invoke('insert-record', {
          collectionId,
          data: {
            name: newRecordData
          },
        });
        setDialogOpen(false);
        fetchRecords();
      } catch (error) {
        console.error('Database error:', error);
      }
    }
  };

  const handleEditButtonClick = (record: CollectionRecord) => {
    setEditRecordData(record.data.name);
    setEditRecordId(record._id);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleDeleteButtonClick = async (record: CollectionRecord) => {
    try {
      await window.electron.ipcRenderer.invoke('delete-record', record);
      fetchRecords();
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  const handleEditRecord = async () => {
    if (editRecordData && editRecordId) {
      try {
        await window.electron.ipcRenderer.invoke('update-record', {
          _id: editRecordId,
          data: {
            name: editRecordData
          },
        });
        setEditDialogOpen(false);
        fetchRecords();
      } catch (error) {
        console.error('Database error:', error);
      }
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>{collection?.name}</h1>
        <Button component={Link} to={`/collections/${collectionId}/edit`} variant="contained" color="primary">
          Edit Collection
        </Button>
      </Box>
      <Button onClick={handleDialogOpen}>Add New Record</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Record ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record._id}</TableCell>
                <TableCell>{record.data.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditButtonClick(record)}>Edit</Button>
                  <Button onClick={() => handleDeleteButtonClick(record)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Record</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Record Data"
            type="text"
            fullWidth
            value={newRecordData}
            onChange={handleRecordDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreateRecord}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Record Data"
            type="text"
            fullWidth
            value={editRecordData}
            onChange={(e) => setEditRecordData(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditRecord}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CollectionPage;
