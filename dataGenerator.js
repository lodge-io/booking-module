function odds(num) {
  return Math.random() < num;
}

function randInt(lo, hi) {
  return lo + Math.floor(Math.random() * (hi - lo));
}

function randChoice(arr) {
  return arr[randInt(0, arr.length)];
}


function createReqObj(ruleRate = 0.4) {
  const myRules = {};
  const rules = ['maximum_guests', 'minimum_stay_length', 'maximum_stay_length'];
  myRules[rules[0]] = Math.ceil(Math.random() * 20);
  if (odds(ruleRate)) {
    myRules[rules[1]] = Math.ceil(Math.random() * 7);
  }
  if (odds(ruleRate)) {
    myRules[rules[2]] = (myRules[rules[1]] || 0) + Math.ceil(Math.random() * 20);
  }
  return myRules;
}

function createFeeArray(feeRate = 0.2) {
  const myFees = {};
  myFees['Cleaning Fee'] = Math.floor((Math.random() * 7) * (Math.random() * 7) * (Math.random() * 7));
  const fees = ['Sheet flipping fee', 'Plant watering fee', 'Fee fee', 'Residency fee', 'Booking fee', 'Service fee'];
  let i = 0;
  while (odds(feeRate)) {
    i = randInt(i, fees.length);
    myFees[fees[i]] = Math.floor((Math.random() * 7) * (Math.random() * 7) * (Math.random() * 7));
  }
  return myFees;
}

function createTaxes(taxesRate = 0.2) {
  const myTaxes = [];
  const taxNames = ['Accomodation Tax', 'Use Tax', 'Sales Tax', 'Hotel Tax', 'Bed Tax', 'Head Tax', 'Healthcare Tax'];
  const randFlatTax = () => ({ type: 'flat', amount: Math.ceil((Math.random() * 6) * (Math.random() * 6) * (Math.random() * 6)) });
  const randPercentTax = () => ({ type: 'percent', rate: (Math.random() / 5).toFixed(4) });
  const taxes = [randFlatTax, randPercentTax];

  myTaxes.push({ [randChoice(taxNames)]: randChoice(taxes)() });
  while (odds(taxesRate)) {
    myTaxes.push({ [randChoice(taxNames)]: randChoice(taxes)() });
  }
  return myTaxes;
}

function createSpecial(rareRate = 0.5) {
  const mySpecials = [];
  let currRareRare = rareRate;
  const specials = ['Rare Find!', 'Super Host', 'New lower price!', 'On people\'s minds!'];
  while (odds(currRareRare)) {
    currRareRare /= 2;
    mySpecials.push({ type: randChoice(specials) });
  }
  return mySpecials;
}

function getReviewStats() {
  return { avgReview: randInt(0, 100) / 20, numReviews: randInt(1, randInt(2, 1000)) };
}

function getRandomPrice() {
  return Math.floor(
    (Math.random() * 7 + 1)
    * (Math.random() * 7 + 1)
    * (Math.random() * 7 + 1)
    * (Math.random() * 7 + 1),
  );
}

module.exports = {
  odds,
  randInt,
  randChoice,
  createReqObj,
  createFeeArray,
  createTaxes,
  createSpecial,
  getReviewStats,
  getRandomPrice,
};
