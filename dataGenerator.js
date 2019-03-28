let mongoose = require('mongoose');

function odds(num) {
  return Math.random() < num;
}

function randInt(lo, hi) {
  return lo + Math.floor(Math.random() * (hi - lo));
}

function randChoice(arr) {
  return arr[randInt(0, arr.length)];
}

function randomDateInc(date, lo, hi) {
  date.setDate(date.getDate() + randInt(lo, hi));
}

function genUserId() {
  return new Array(15).fill(0).map(
    () => randChoice(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']),
  ).join('');
}


function genReqObj(ruleRate = 0.4) {
  const myRules = {};
  const rules = ['maximum_guests', 'minimum_stay_length', 'maximum_stay_length'];
  myRules[rules[0]] = Math.ceil(Math.random() * 30);
  if (odds(ruleRate)) {
    myRules[rules[1]] = Math.ceil(Math.random() * 7);
  }
  if (odds(ruleRate)) {
    myRules[rules[2]] = (myRules[rules[1]] || 0) + Math.ceil(Math.random() * 20);
  }
  return myRules;
}

function genFeeArray(feeRate = 0.2) {
  const myFees = {};
  myFees['Cleaning Fee'] = Math.ceil((Math.random() * 7 + 1) * (Math.random() * 7 + 1) * (Math.random() * 7 + 1));
  const fees = ['Sheet flipping fee', 'Plant watering fee', 'Fee fee', 'Residency fee', 'Booking fee', 'Service fee'];
  let i = 0;
  while (odds(feeRate)) {
    i = randInt(i, fees.length);
    myFees[fees[i]] = Math.ceil(
      (Math.random() * 7 + 1)
      * (Math.random() * 7 + 1)
      * (Math.random() * 7 + 1),
    );
  }
  return myFees;
}

function genTaxArr(taxesRate = 0.8) {
  let taxOdds = taxesRate;
  const myTaxes = [];
  const taxNames = ['Accomodation Tax', 'Use Tax', 'Sales Tax', 'Hotel Tax', 'Bed Tax', 'Head Tax', 'Healthcare Tax'];
  const randFlatTax = name => ({ name, type: 'flat', amount: Math.ceil((Math.random() * 6) * (Math.random() * 6) * (Math.random() * 6)) });
  const randPercentTax = name => ({ name, type: 'percent', rate: parseFloat((Math.random() / 5).toFixed(4)) });
  const taxConstructors = [ /*randFlatTax,*/ randPercentTax];

  myTaxes.push(randChoice(taxConstructors)(randChoice(taxNames)));
  while (odds(taxOdds)) {
    taxOdds /= 2;
    myTaxes.push(randChoice(taxConstructors)(randChoice(taxNames)));
  }
  return myTaxes;
}

function genSpecialArr(rareRate = 0.5) {
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
  return { avgReview: randInt(10, 50) / 10, numReviews: randInt(1, randInt(2, 1000)) };
}

function getRandomPrice() {
  return Math.ceil(
    (Math.random() * 4 + 1)
    * (Math.random() * 4 + 1)
    * (Math.random() * 4 + 1)
    * (Math.random() * 4 + 1)
    * (Math.random() * 4 + 1) + 10,
  );
}

function genBookingArr() {
  const populatrity = Math.random() * Math.random();
  let avgWait = 1 / populatrity;
  const now = new Date(Date.now());
  const today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  const date = new Date(today);
  randomDateInc(date, 0, 2 * avgWait);

  const bookingArr = [];
  let newBooking;
  const YEAR_IN_MILLI = 3.154e+10;
  while (date.getTime() - now.getTime() < 2 * YEAR_IN_MILLI) {
    newBooking = {};
    newBooking.startDate = new Date(date);
    randomDateInc(date, 1, randInt(2, 10));
    newBooking.endDate = new Date(date);
    newBooking.totalBookingCost = 5 * (Math.random() + 0.5) * getRandomPrice();
    newBooking.userId = genUserId();
    newBooking.guests = {
      adults: randInt(1, 4),
      children: randInt(0, 4),
      infants: randInt(0, 5),
    };
    bookingArr.push(newBooking);
    randomDateInc(date, 0, 2 * avgWait);
    avgWait *= 1 + ((date.getTime() - now.getTime()) / (YEAR_IN_MILLI * 4));
  }
  return bookingArr;
}

function genListing() {
  const listing = {};
  listing.requirements = genReqObj();
  listing.fees = genFeeArray();
  listing.taxes = genTaxArr();
  listing.specials = genSpecialArr();
  listing.reviews = getReviewStats();
  listing.price = getRandomPrice();
  listing.bookings = genBookingArr();
  return listing;
}


mongoose.connect('mongodb://localhost/lodge-io', { useNewUrlParser: true });
const db = mongoose.connection;

const tax = new mongoose.Schema({
  name: String,
  type: String,
  amount: Number,
  rate: Number,
});

const requirement = new mongoose.Schema({
  name: String,
});

const special = new mongoose.Schema({
  type: String
});

const booking = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  totalBookingCost: Number,
  userId: String,
  guests: {
    adults: Number,
    children: Number,
    infants: Number,
  },
})

const listingSchema = new mongoose.Schema({
  fees: { 'Cleaning Fee': Number },
  taxes: [tax],
  requirements: [requirement],
  specials: [special],
  reviews: { avgReview: Number, numReviews: Number },
  price: Number,
  bookings: [booking],
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('asdf');
  const Listing = mongoose.model('listing', listingSchema);
  const a1 = genListing();
  const a2 = new Listing(a1);
  a2.save();
});

module.exports = {
  odds,
  randInt,
  randChoice,
  genReqObj,
  genFeeArray,
  genTaxArr,
  genSpecialArr,
  getReviewStats,
  getRandomPrice,
  genBookingArr,
  genListing,
};