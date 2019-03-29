const gen = require('./DataGenerator.js');
const db = require('./DbManager.js');

setTimeout(() => {
  db.con.db.dropCollection('listings', (a) => {
    console.log(a);
    for (let i = 0; i < 1000; i += 1) {
      db.createListing(gen.genListing(i));
    }
  });
}, 100);
