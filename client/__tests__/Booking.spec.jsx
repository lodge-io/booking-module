import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Calendar from '../src/components/Calendar';

const basicListing = () => {
  return {
    id:123,
    requirements: [],
    fees: [],
    taxes: [],
    specials: [],
    reviews: { avgReview: 4.5, numReviews: 300 },
    price: 120,
    bookings: []
  }
}

describe('Booking component', () => {

  it('should render the price of a listing', () => {
    const listing = basicListing();
    const wrapper = shallow(<Calendar listing={listing}/>);
    expect(wrapper.contains(123)).toBeTruthy();
  });

  it('should open calendar on click') {
    const listing = basicListing();
    const wrapper = shallow(<Calendar listing={listing} />);
    const startDate = wrapper.find('button')
  }
});
