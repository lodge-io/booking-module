const gen = require('../dataGenerator.js');

test('should generate a random number in range excluding last val', ()=>{
    var res;
    res = gen.randInt(1,2);
    for (let i = 0; i < 10; i++) {
        expect(gen.randInt(0,1)).toBe(0);
    }
    for (let i = 0; i < 10; i++) {
        expect([4,5,6,7,8]).toContain(gen.randInt(4, 8));
    }
});

test('should create an array with requirements or nothing', ()=>{
    
    for (var i = 0; i < 20; i++) {
        let res = gen.createReqArray();
        expect([0,1,2,3]).toContain(Object.keys(res).length);
        for (var rule in res) {
            expect(res[rule]).toBeGreaterThan(0);
        }
        if (res['maximum_stay_length'] && res['minimum_stay_length']) {
            expect(res['maximum_stay_length']).toBeGreaterThanOrEqual(res['minimum_stay_length']);
        }
    }
});