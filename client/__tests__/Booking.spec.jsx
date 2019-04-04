import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Booking from '../src/components/Booking';
import { wrap } from 'module';

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

  xit('should render the price of a listing', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    expect(wrapper.contains(123)).toBeTruthy();
  });

  xit('should open calendar on click to a start date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Calendar listing={listing} />);
    const startDate = wrapper.find('.dateSelectStart');
    startDate.simulate('click');
    expect(wrapper.state().calOpen).toBeTruthy();
    expect(wrapper.state().selecting).toBe(0);
  });

  xit('should open calendar on click to a end date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Calendar listing={listing} />);
    const startDate = wrapper.find('.dateSelectEnd');
    startDate.simulate('click');
    expect(wrapper.state().calOpen).toBeTruthy();
    expect(wrapper.state().selecting).toBe(1);
  });

  xit('should take a start date and switch to selecting end date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    const startDateField = wrapper.find('.dateSelectStart');
    startDateField.simulate('click');
    const date = moment().add(3, 'days');

    wrapper.instance().inputDate(date)
    expect(wrapper.state().startDate.format()).toEqual(date.format());
    expect(wrapper.state().selecting).toEqual(1);
  });

  xit('should take an end date and switch to selecting start date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    const endDateField = wrapper.find('.dateSelectEnd');
    endDateField.simulate('click');
    const date = moment().add(5, 'days');

    wrapper.instance().inputDate(date)
    expect(wrapper.state().endDate.format()).toEqual(date.format());
    expect(wrapper.state().selecting).toEqual(0);
  });

  xit('should reject dates from the past', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    const date = moment().subtract(5, 'days');
    
    const startDateField = wrapper.find('.dateSelectStart');
    startDateField.simulate('click');
    wrapper.instance().inputDate(date)
    expect(wrapper.state().endDate).toBeFalsy();

    const endDateField = wrapper.find('.dateSelectEnd');
    endDateField.simulate('click');
    wrapper.instance().inputDate(date);
    expect(wrapper.state.endDate).toBeFalsy();
  });

  xit('should reject dates which are already booked', () => {

  });

  xit('should reject bookings which are less than the minimum stay length', () => {

  });

  xit('should reject bookings where the start is after the end', () => {

  });

  xit('should ensure reservation has a valid number of guests', () => {

  });

  xit('should close calendar and show price calc after a valid range has been selected', () => {

  });

  xit('should correctly calculate price given fees and taxes', () => {

  });

  xit('on booking button press with invalid range, should open calendar with first date selecting', () => {

  });

  xit('on booking button press with valid booking, should post to server', () => {

  });

});
