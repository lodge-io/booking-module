const manager = require('./DbManager.js');

const loadDB = () => (
  manager.conPromse
    .then(() => (manager.seedDatabase()))
    .then(() => console.log('Succesfully Seeded!'))
    .catch((e) => { console.log(e); })
);

module.exports = loadDB;
