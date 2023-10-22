import React from 'react';
import List from '@mui/material/List';
import RecordItem from './RecordItem';

const RecordList = ({ records = [] }) => {
  return (
    <List>
      {records.map((record, index) => (
        <RecordItem key={index} record={record} />
      ))}
    </List>
  );
};

export default RecordList;