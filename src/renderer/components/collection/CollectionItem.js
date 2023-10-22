import React from 'react';
import ListItem from '@mui/material/ListItem';

const CollectionItem = ({ collection }) => {
  return (
    <ListItem>
      {collection.name}
    </ListItem>
  );
};

export default CollectionItem;