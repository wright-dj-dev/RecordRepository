import { ipcMain } from 'electron';
import db from './db';

ipcMain.handle('get-collections', async (event) => {
  return new Promise((resolve, reject) => {
    db.find({ type: 'collection' }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
});

ipcMain.handle('insert-collection', async (event, newCollectionData) => {
  console.log('insert-collection data:', newCollectionData);
  try {
    const newDoc = await db.insert({
      ...newCollectionData,
      type: 'collection',
    });
    console.log('New doc inserted:', newDoc);
    return newDoc;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
});

ipcMain.handle('get-collection', async (event, collectionId) => {
  return new Promise((resolve, reject) => {
    db.findOne({ type: 'collection', _id: collectionId }, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
});

ipcMain.handle('get-records', async (event, collectionId) => {
  return new Promise((resolve, reject) => {
    db.find({ type: 'record', collectionId: collectionId }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
});

ipcMain.handle('insert-record', async (event, newRecordData) => {
  console.log('insert-record data:', newRecordData);
  try {
    const newDoc = await db.insert({
      ...newRecordData,
      type: 'record',
    });
    console.log('New record inserted:', newDoc);
    return newDoc;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
});

ipcMain.handle('update-record', async (event, updateData) => {
  return new Promise((resolve, reject) => {
    db.update(
      { _id: updateData._id },
      { $set: { data: updateData.data } },
      {},
      (err, numReplaced) => {
        if (err) reject(err);
        resolve(numReplaced);
      },
    );
  });
});

ipcMain.handle('delete-record', async (event, deleteData) => {
  return new Promise((resolve, reject) => {
    db.remove({ _id: deleteData._id }, {}, (err, numRemoved) => {
      if (err) reject(err);
      resolve(numRemoved);
    });
  });
});

ipcMain.handle('update-collection', async (event, updateData) => {
  return new Promise((resolve, reject) => {
    db.update(
      { _id: updateData._id, type: 'collection' },
      { $set: { name: updateData.name } },
      {},
      (err, numReplaced) => {
        if (err) reject(err);
        resolve(numReplaced);
      },
    );
  });
});

ipcMain.handle('delete-collection', async (event, deleteData) => {
  return new Promise((resolve, reject) => {
    db.remove(
      { _id: deleteData._id, type: 'collection' },
      {},
      (err, numRemoved) => {
        if (err) reject(err);
        resolve(numRemoved);
      },
    );
  });
});
