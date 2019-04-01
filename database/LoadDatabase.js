const gen = require('./DataGenerator.js');
const db = require('./DbManager.js');

function loadDatabase() {
  const arr = [];
  for (let i = 0; i < 100; i += 1) {
    arr.push(gen.genListing(i));
  }
  return db.createMultiListing(arr);
}

setTimeout(() => {
  db.con.db.dropCollection('listings', () => {
    loadDatabase()
      .then(() => db.con.close());
  });
}, 100);

module.exports = loadDatabase;
