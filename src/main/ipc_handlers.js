import { ipcMain } from 'electron';
import db from './db';

ipcMain.handle('get-workspaces', async (event) => {
  return new Promise((resolve, reject) => {
    db.find({ type: 'workspace' }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
});

ipcMain.handle('insert-workspace', async (event, newWorkspaceData) => {
  console.log('insert-workspace data:', newWorkspaceData);
  try {
    const newDoc = await db.insert({
      ...newWorkspaceData,
      type: 'workspace',
    });
    console.log('New doc inserted:', newDoc);
    return newDoc;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
});

ipcMain.handle('get-workspace', async (event, workspaceId) => {
  return new Promise((resolve, reject) => {
    db.findOne({ type: 'workspace', _id: workspaceId }, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
});

ipcMain.handle('get-records', async (event, workspaceId) => {
  return new Promise((resolve, reject) => {
    db.find({ type: 'record', workspaceId: workspaceId }, (err, docs) => {
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

ipcMain.handle('update-workspace', async (event, updateData) => {
  return new Promise((resolve, reject) => {
    db.update(
      { _id: updateData._id, type: 'workspace' },
      { $set: { name: updateData.name } },
      {},
      (err, numReplaced) => {
        if (err) reject(err);
        resolve(numReplaced);
      },
    );
  });
});

ipcMain.handle('delete-workspace', async (event, deleteData) => {
  return new Promise((resolve, reject) => {
    db.remove(
      { _id: deleteData._id, type: 'workspace' },
      {},
      (err, numRemoved) => {
        if (err) reject(err);
        resolve(numRemoved);
      },
    );
  });
});
