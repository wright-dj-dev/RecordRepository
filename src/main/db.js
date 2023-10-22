const Datastore = require('nedb');
const path = require('path');
const { app } = require('electron');

const db = new Datastore({
  filename: path.join(app.getPath('userData'), '/database.db'),
  autoload: true
});

module.exports = db;