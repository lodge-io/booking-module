const manager = require('./DbManager.js');

manager.con.once('open', () => {
  manager.seedDatabase()
    .then(() => console.log('Succesfully Seeded!'))
    .catch((e) => { console.log(e); });
});
