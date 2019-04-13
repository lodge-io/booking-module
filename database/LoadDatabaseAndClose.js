const manager = require('./DbManager.js');

manager.con.once('open', () => {
  manager.seedDatabase()
    .then(() => console.log('Successfully Seeded! Closing...'))
    .then(() => manager.con.close())
    .catch((e) => { console.log(e); });
});
