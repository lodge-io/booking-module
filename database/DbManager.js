const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

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
const Listing = mongoose.model('listing', listingSchema);


mongoose.connect('mongodb://localhost/lodge-io', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

function readListing(id) {
  return Listing.findById(id);
}
function loadListing(obj) {
  const a = new Listing(obj);
  a.save().catch(e => console.log(e)).then(c => console.log('success:\n', c));
}
function deleteListing(id) {
  return Listing.remove({ _id: id }).then((a) => {
    console.log(a);
    return a;
  });
}


module.exports.ListingModel = Listing;
module.exports.readListing = readListing;
module.exports.loadListing = loadListing;
module.exports.deleteListing = deleteListing;
