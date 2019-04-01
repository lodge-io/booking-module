const mongoose = require('mongoose');
const gen = require('./DataGenerator.js');

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


const conPromise = mongoose.connect('mongodb://localhost/lodge-io', { useNewUrlParser: true })
  .then(() => {
    console.log('connected!');
  })
  .catch((e) => {
    console.log('connection error occured');
    console.log(e);
  });
const con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));


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

function seedDatabase() {
  return con.db.listCollections({ name: 'listings' })
    .toArray()
    .then((list) => {
      const listings = gen.genListingArr();
      if (list.length === 0) {
        return createMultiListing(listings);
      }
      return con.db.dropCollection('listings')
        .then(() => createMultiListing(listings));
    });
}
// return con.db.dropCollection('listings').then(() => {
//   const arr = [];
//   for (let i = 0; i < 100; i += 1) {
//     arr.push(gen.genListing(i));
//   }
//   return createMultiListing(arr);


module.exports.ListingModel = Listing;
module.exports.readListing = readListing;
module.exports.createListing = createListing;
module.exports.deleteListing = deleteListing;
module.exports.readAll = readAll;
module.exports.createMultiListing = createMultiListing;
module.exports.seedDatabase = seedDatabase;
module.exports.conPromse = conPromise;
module.exports.con = con;
