import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const MainArea = () => {
  const records = ['Record 1', 'Record 2', 'Record 3'];

  return (
    <div className="main-area">
      <List>
        {records.map((record, index) => (
          <ListItem key={index}>
            {record}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MainArea;