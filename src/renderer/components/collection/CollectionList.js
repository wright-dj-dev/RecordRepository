import React from 'react';
import List from '@mui/material/List';
import CollectionItem from './CollectionItem';

const CollectionList = ({ collections = [] }) => {
  return (
    <List>
      {collections.map((collection, index) => (
        <CollectionItem key={index} collection={collection} />
      ))}
    </List>
  );
};

export default CollectionList;