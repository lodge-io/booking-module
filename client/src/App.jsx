import Booking from './components/Booking.jsx';

const listing = {
  id: 123,
  requirements: [],
  fees: [],
  taxes: [],
  specials: [],
  reviews: { avgReview: 4.5, numReviews: 300 },
  price: 120,
  bookings: [],
};

window.Booking = Booking;
