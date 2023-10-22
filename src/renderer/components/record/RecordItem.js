import React from 'react';
import ListItem from '@mui/material/ListItem';

const RecordItem = ({ record }) => {
  return (
    <ListItem>
      {record.name}
    </ListItem>
  );
};

export default RecordItem;