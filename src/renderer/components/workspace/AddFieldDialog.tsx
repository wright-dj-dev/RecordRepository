import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

type AddFieldDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddField: (fieldType: string, fieldName: string) => void;
};

const AddFieldDialog: React.FC<AddFieldDialogProps> = ({ open, onClose, onAddField }) => {
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('');

  const handleAdd = () => {
    if (fieldName.trim() && fieldType.trim()) {
      onAddField(fieldType.trim(), fieldName.trim());
      setFieldName('');
      setFieldType('');
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Field</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="type"
          label="Field Type"
          fullWidth
          variant="standard"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Field Name"
          fullWidth
          variant="standard"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFieldDialog;