import React from 'react';
import ListItem from '@mui/material/ListItem';

const WorkspaceItem = ({ workspace }) => {
  return (
    <ListItem>
      {workspace.name}
    </ListItem>
  );
};

export default WorkspaceItem;