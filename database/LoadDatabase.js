const mongoose = require('mongoose');
const gen = require('./DataGenerator.js');
const db = require('./DbManager.js');

setTimeout(() => {
  db.loadListing(gen.genListing());
}, 100);
