import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCollections } from '../../contexts/CollectionProvider';

type Collection = {
  _id: string;
  name: string;
};

const EditCollectionPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const navigate = useNavigate();
  const { collections, fetchCollections } = useCollections();

  const handleSuccess = () => {
    fetchCollections()
    navigate(`/collections`);
  };

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const collectionData = await window.electron.ipcRenderer.invoke('get-collection', collectionId) as Collection;
        setCollection(collectionData);
        setNewCollectionName(collectionData.name);
      } catch (error) {
        console.error('Database error:', error);
      }
    };

    fetchCollectionData();
  }, [collectionId]);

  const handleCollectionNameChange = (event) => {
    setNewCollectionName(event.target.value);
  };

  const handleUpdateCollection = async () => {
    if (newCollectionName) {
      try {
        await window.electron.ipcRenderer.invoke('update-collection', {
          _id: collectionId,
          name: newCollectionName,
        });
        handleSuccess();
      } catch (error) {
        console.error('Database error:', error);
      }
    }
  };

  const handleDeleteCollection = async () => {
    try {
      await window.electron.ipcRenderer.invoke('delete-collection', {
        _id: collectionId,
      });
      handleSuccess();
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  return (
    <div>
      <h1>Edit Collection</h1>
      <TextField
        label="Collection Name"
        value={newCollectionName}
        onChange={handleCollectionNameChange}
      />
      <Button onClick={handleUpdateCollection}>Update Collection</Button>
      <Button onClick={handleDeleteCollection} color="secondary">Delete Collection</Button> {/* Added Delete button */}
    </div>
  );
};

export default EditCollectionPage;
