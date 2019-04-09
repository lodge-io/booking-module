import React from 'react';
import ReactDOM from 'react-dom';
import Booking from './components/Booking.jsx';
console.log('asdfasdf');
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

ReactDOM.render(<Booking listing={listing} id={11} />,
  document.querySelector('#booking-module'));
