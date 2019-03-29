const mongoose = require('mongoose');
const gen = require('./dataGenerator.js');

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
  type: String,
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
});

const listingSchema = new mongoose.Schema({
  fees: { 'Cleaning Fee': Number },
  taxes: [tax],
  requirements: [requirement],
  specials: [special],
  reviews: { avgReview: Number, numReviews: Number },
  price: Number,
  bookings: [booking],
});

mongoose.connect('mongodb://localhost/lodge-io', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('asdf');
  const Listing = mongoose.model('listing', listingSchema);
  const a1 = gen.genListing();
  const a2 = new Listing(a1);
  a2.save();
  // db.close();
});
