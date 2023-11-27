import React from 'react';
import List from '@mui/material/List';
import WorkspaceItem from './WorkspaceItem';

const WorkspaceList = ({ collections = [] }) => {
  return (
    <List>
      {collections.map((collection, index) => (
        <WorkspaceItem key={index} collection={collection} />
      ))}
    </List>
  );
};

export default WorkspaceList;