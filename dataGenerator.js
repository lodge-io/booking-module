// Reviews database

const creatReviewEntry = function (num) {
    const goodness = Math.random();
    // console.log(goodness)
    const starAmount = 5;
    reviewArr = [];
    let amount;
    for (var i = 0; i < num; i++) {
        amount = Math.random() * starAmount;
        amount = Math.floor(Math.min(5, amount * (0.5 / (1 - goodness))));
        let review = { value: amount, name: 'Jona Doe' };
        reviewArr.push(review);
    }
    return reviewArr;
};

const createReqArray = function (ruleRate = 0.4) {
    let myRules = {};
    const rules = ['maximum_guests', 'minimum_stay_length', 'maximum_stay_length'];
    rules.forEach(val => {
        if (Math.random() < ruleRate) {
            if (val === 'maximum_stay_length' && myRules['minimum_stay_length']) {
                console.log('asdf')
                myRules[val] = myRules['minimum_stay_length'] + Math.floor(Math.random() * 10);
            } else {
                myRules[val] = Math.ceil(Math.random() * 10);
            }
        }
    });
    return myRules;
}

