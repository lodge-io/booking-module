const gen = require('../dataGenerator.js');

test('should generate a random number in range excluding last val', () => {
  for (let i = 0; i < 10; i += 1) {
    expect(gen.randInt(0, 1)).toBe(0);
  }
  for (let i = 0; i < 10; i += 1) {
    expect([4, 5, 6, 7, 8]).toContain(gen.randInt(4, 8));
  }
});

test('should create an array with valid requirements or nothing', () => {
  let res;
  const checkRes = val => expect(res[val]).toBeGreaterThan(0);
  for (let i = 0; i < 20; i += 1) {
    res = gen.createReqObj();
    expect([0, 1, 2, 3]).toContain(Object.keys(res).length);
    Object.keys(res).forEach(checkRes);
  }
  if (res.maximum_stay_length && res.minimum_stay_length) {
    expect(res.maximum_stay_length).toBeGreaterThanOrEqual(res.minimum_stay_length);
  }
});
