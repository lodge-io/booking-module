const manager = require('../database/DbManager.js');

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

test('should delete a listing', () => {
  let deleted;
  return manager.readAll()
    .then(list => list.length)
    .then((len) => {
      deleted = Math.floor(Math.random() * len);
      return manager.deleteListing(deleted);
    })
    .then(() => manager.readListing(deleted))
    .then(val => expect(val).toBeFalsy());
});


