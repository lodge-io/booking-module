const manager = require('./DbManager.js');

manager.con.once('open', () => {
  manager.seedDatabase();
});
