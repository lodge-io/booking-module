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
  id: { type: Number, unique: true, required: true },
  fees: {},
  taxes: [tax],
  requirements: [requirement],
  specials: [special],
  reviews: { avgReview: Number, numReviews: Number },
  price: Number,
  bookings: [booking],
});
const Listing = mongoose.model('listing', listingSchema);


mongoose.connect('mongodb://localhost/lodge-io', { useNewUrlParser: true });
const con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', () => {
});

function readAll() {
  return Listing.find();
}
function readListing(id) {
  return Listing.find({ id }).then(res => res[0]);
}
function createListing(obj) {
  const a = new Listing(obj);
  return a.save().catch(e => console.log(e));
}

function createMultiListing(arr) {
  const a = [];
  arr.forEach(val => a.push(new Listing(val)));
  // console.log(arr[0]);
  return Listing.insertMany(a);

}

function deleteListing(id) {
  return Listing.deleteOne({ id }).then((a) => {
    return a;
  });
}

function clearListings() {
  return con.db.dropCollection('listings');
}


module.exports.ListingModel = Listing;
module.exports.readListing = readListing;
module.exports.createListing = createListing;
module.exports.deleteListing = deleteListing;
module.exports.readAll = readAll;
module.exports.createMultiListing = createMultiListing;
module.exports.con = con;
