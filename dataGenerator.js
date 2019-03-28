const odds = function(num) {
    return Math.random() < num;
}

const randInt = function(lo, hi) {
    return lo + Math.floor(Math.random() * (hi - lo));
}

const randChoice = function(arr) {
    return arr[randInt(0, arr.length)];
}


const createReqArray = function (ruleRate = 0.4) {
    let myRules = {};
    const rules = ['maximum_guests', 'minimum_stay_length', 'maximum_stay_length'];
    myRules[rules[0]] = Math.ceil(Math.random() * 20);
    if (odds(ruleRate)) {
        myRules[rules[1]] = Math.ceil(Math.random() * 7);
    }
    if (odds(ruleRate)) {
        myRules[rules[2]] = (myRules[rules[1]] || 0) + Math.ceil(Math.random() * 20);
    }
    return myRules;
};

const createFeeArray = function(feeRate = 0.2) {
    let myFees = {};
    myFees['Cleaning Fee'] = Math.floor((Math.random() * 7) * (Math.random() * 7) * (Math.random() * 7));
    const fees = ['Sheet flipping fee', 'Plant watering fee', 'Fee fee', 'Residency fee','Booking fee', 'Service fee'];
    let i = 0;
    while (odds(feeRate)) {
        i = randInt(i, fees.length);
        myFees[fees[i]] = Math.floor((Math.random() * 7) * (Math.random() * 7) * (Math.random() * 7));
    }
    return myFees;    
}

const createTaxes = function(taxesRate = 0.2) {
    let myTaxes = [];
    const taxNames = ['Accomodation Tax', 'Use Tax', 'Sales Tax', 'Hotel Tax', 'Bed Tax', 'Head Tax', 'Healthcare Tax'];
    const randFlatTax = () => ({type:'flat', amount:Math.ceil((Math.random() * 6) * (Math.random() * 6) * (Math.random() * 6))});
    const randPercentTax = () => ({type:'percent', rate:(Math.random()/5).toFixed(4)});
    const taxes = [randFlatTax, randPercentTax];

    myTaxes.push({[randChoice(taxNames)]: randChoice(taxes)()});
    while (odds(taxesRate)) {

        myTaxes.push({[randChoice(taxNames)]: randChoice(taxes)()});
    }
    return myTaxes;
}

const createSpecial = function(rareRate = 0.5) {
    let mySpecials = [];
    const specials = ['Rare Find!', 'Super Host', 'New lower price!', 'On people\'s minds!'];
    while (odds(rareRate)) {
        rareRate = rareRate/2;
        mySpecials.push({type: randChoice(specials)});
    }
    return mySpecials;
}

const getReviewStats = function() {
    return {avgReview: randInt(0,100)/20, numReviews: randInt(1, randInt(2, 1000))}
}

const getRandomPrice = function () {
    return Math.floor((Math.random() * 7 + 1) * (Math.random() * 7 + 1) * (Math.random() * 7 + 1) * (Math.random() * 7 + 1));
}

module.exports= {odds, randInt, randChoice, createReqArray, createFeeArray, createTaxes, createSpecial, getReviewStats, getRandomPrice};
