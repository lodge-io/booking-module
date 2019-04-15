const manager = require('../database/DbManager.js');
const gen = require('../database/DataGenerator.js');
const load = require('../database/LoadDatabaseFn.js');


beforeAll(next => (
  load().then(() => next())
));

test('should load data from database', () => {
  expect.assertions(1);
  return manager.readAll().then(val => expect(val.length).toBeGreaterThan(0));
});

test('should load a specific entry from database', () => {
  // expect.assertions(1);  
  return manager.readListing(2).then((res) => {
    expect(res.reviews.avgReview).toBeGreaterThanOrEqual(0);
    expect(res.id).toBeGreaterThanOrEqual(0);
    expect(res.requirements.length).toBeGreaterThanOrEqual(0);
    expect(res.fees['Cleaning Fee']).toBeGreaterThanOrEqual(0);
    expect(res.taxes.length).toBeGreaterThanOrEqual(0);
    expect(res.specials.length).toBeGreaterThanOrEqual(0);
    expect(res.price).toBeGreaterThanOrEqual(9);
    expect(res.bookings.length).toBeGreaterThanOrEqual(0);
    if (res.bookings.length > 0) {
      const i = 0;
      const b = res.bookings[i];
      const d1 = new Date(b.startDate);
      const d2 = new Date(b.endDate);
      expect(d2.getTime() - d1.getTime()).toBeGreaterThan(0);
      expect(b.totalBookingCost).toBeGreaterThan(9);
      expect(typeof b.userId).toBe('string');
    }
  });
});

test('should insert a listing', () => {
  const num = 123123123;
  return manager.createListing(gen.genListing(num))
    .then(() => manager.readListing(num))
    .then((a) => {
      expect(a.bookings.length).toBeGreaterThanOrEqual(0);
      return manager.deleteListing(num);
    });
});

test('should delete a listing', () => {
  const num = 123123123;
  return manager.createListing(gen.genListing(num))
    .then(() => manager.deleteListing(num))
    .then(() => manager.readListing(num))
    .then(val => expect(val).toBeFalsy());
});

afterAll(() => manager.con.close());
