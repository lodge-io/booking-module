const gen = require('../database/DataGenerator.js');

describe('first thing', () => {

});
test('should generate a random number in range excluding last val', () => {
  for (let i = 0; i < 10; i += 1) {
    expect(gen.randInt(0, 1)).toBe(0);
  }
  for (let i = 0; i < 10; i += 1) {
    expect([4, 5, 6, 7, 8]).toContain(gen.randInt(4, 8));
  }
});

test('should gen an object with valid requirements or nothing', () => {
  let res;
  const checkRes = val => expect(res[val]).toBeGreaterThan(0);
  for (let i = 0; i < 20; i += 1) {
    res = gen.genReqObj();
    expect([0, 1, 2, 3]).toContain(Object.keys(res).length);
    Object.keys(res).forEach(checkRes);
  }
  if (res.maxBookingLength && res.minBookingLength) {
    expect(res.maxBookingLength).toBeGreaterThanOrEqual(res.minBookingLength);
  }
});

test('should creat an array of fees', () => {
  let res;
  const feeChecker = key => expect(res[key]).toBeGreaterThan(0);
  for (let i = 0; i < 10; i += 1) {
    res = gen.genFeeObj();
    expect(Object.keys(res).length).toBeGreaterThan(0);
    Object.keys(res).forEach(feeChecker);
  }
});

test('should gen taxes', () => {
  let taxes;
  const taxChecker = (tax) => {
    expect(['flat', 'percent']).toContain(tax.type);
    if (tax.type === 'percent') {
      expect(tax.rate).toBeGreaterThan(0);
    } else {
      expect(tax.amount).toBeGreaterThan(0);
    }
  };
  for (let i = 0; i < 10; i += 1) {
    taxes = gen.genTaxArr();
    expect(taxes.length).toBeGreaterThanOrEqual(0);
    taxes.forEach(taxChecker);
  }
});

test('should output something special about the property sometimes', () => {
  const specialCheck = sp => expect(typeof sp.type).toBe('string');
  for (let i = 0; i < 10; i += 1) {
    const special = gen.genSpecialArr();
    expect(special.length).toBeGreaterThanOrEqual(0);
    special.forEach(specialCheck);
  }
});

test('should give a valid 5-star-based review average', () => {
  for (let i = 0; i < 10; i += 1) {
    const stats = gen.getReviewStats();
    expect(stats.avgReview).toBeGreaterThanOrEqual(1);
    expect(stats.avgReview).toBeLessThanOrEqual(5);
    expect(stats.numReviews).toBeGreaterThanOrEqual(1);
  }
});

test('should give a random price', () => {
  for (let i = 0; i < 10; i += 1) {
    const price = gen.getRandomPrice();
    expect(price).toBeGreaterThan(9);
  }
});

test('should generate a random booking array', () => {
  for (let i = 0; i < 10; i += 1) {
    const bookings = gen.genBookingArr();
    expect(bookings.length).toBeGreaterThanOrEqual(0);
    bookings.forEach((book, index, bookArr) => {
      if (index > 0) {
        expect(book.startDate.getTime())
          .toBeGreaterThanOrEqual(bookArr[index - 1].startDate.getTime());
      }
      expect(book.startDate.getTime()).toBeLessThan(book.endDate.getTime());
      expect(book.totalBookingCost).toBeGreaterThanOrEqual(10);
      expect(book.guests.adults).toBeGreaterThan(0);
      expect(book.guests.children).toBeGreaterThanOrEqual(0);
      expect(book.guests.infants).toBeGreaterThanOrEqual(0);
    });
  }
});
