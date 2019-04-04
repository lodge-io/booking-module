import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Booking from '../src/components/Booking';

const basicListing = () => ({
  id: 123,
  requirements: [],
  fees: [],
  taxes: [],
  specials: [],
  reviews: { avgReview: 4.5, numReviews: 300 },
  price: 120,
  bookings: [],
});

const dateFromNow = days => moment().add(days, 'days').startOf('day');

const clickOnStartDateField = (wrapper) => {
  wrapper.find('.dateSelectStart').simulate('click');
};

const clickOnEndDateField = (wrapper) => {
  wrapper.find('.dateSelectEnd').simulate('click');
};

describe('Booking component', () => {

  xit('should render the price of a listing', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    expect(wrapper.contains(123)).toBeTruthy();
  });

  xit('should open calendar on click to a start date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);

    clickOnStartDateField(wrapper);
    expect(wrapper.state().calOpen).toBeTruthy();
    expect(wrapper.state().selecting).toBe(0);
  });

  xit('should open calendar on click to a end date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    clickOnEndDateField(wrapper);
    expect(wrapper.state().calOpen).toBeTruthy();
    expect(wrapper.state().selecting).toBe(1);
  });

  xit('should take a start date and switch to selecting end date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    clickOnStartDateField(wrapper);
    const date = dateFromNow(3);

    wrapper.instance().inputDate(date);
    expect(wrapper.state().startDate.format()).toEqual(date.format());
    expect(wrapper.state().selecting).toEqual(1);
  });

  xit('should take an end date and switch to selecting start date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    clickOnEndDateField(wrapper);
    const date = dateFromNow(5);

    wrapper.instance().inputDate(date);
    expect(wrapper.state().endDate.format()).toEqual(date.format());
    expect(wrapper.state().selecting).toEqual(0);
  });

  xit('should reject dates from the past', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    const date = dateFromNow(-5);

    clickOnStartDateField(wrapper);
    wrapper.instance().inputDate(date);
    expect(wrapper.state().endDate).toBeFalsy();

    clickOnEndDateField(wrapper);
    wrapper.instance().inputDate(date);
    expect(wrapper.state.endDate).toBeFalsy();
  });

  xit('should reject dates which are already booked', () => {
    const listing = basicListing();
    const bookingStart = dateFromNow(3);
    const bookingEnd = dateFromNow(6);
    const badReserveTime = dateFromNow(3);
    const goodReserveTime = dateFromNow(6);
    listing.bookings.push({
      startDate: bookingStart.toDate(),
      endDate: bookingEnd.toDate(),
    });

    const wrapper = shallow(<Booking listing={listing} />);
    wrapper.instance().inputDate(badReserveTime);
    expect(wrapper.state().startDate).toBeFalsy();
    wrapper.instance().inputDate(goodReserveTime);
    expect(wrapper.state().statDate.format()).toBe(goodReserveTime.format());
  });

  xit('should reject bookings which do not meet required length', () => {
    const listing = basicListing();
    listing.requirements = { minimum_stay_length: 5, maximum_stay_length: 30 };
    const wrapper = shallow(<Booking listing={listing} />);
    const startDate = dateFromNow(2);
    const tooShortEnd = dateFromNow(6);
    const tooLongEnd = dateFromNow(33);
    const justRightEnd = dateFromNow(7);

    clickOnStartDateField(wrapper);
    wrapper.instance().inputDate(startDate);
    wrapper.instance().inputDate(tooShortEnd);
    expect(wrapper.state().endDate).toBeFalsy();
    expect(wrapper.state().selecting).toBe(1);

    wrapper.instance().inputDate(tooLongEnd);
    expect(wrapper.state().endDate).toBeFalsy();
    expect(wrapper.state().selecting).toBe(1);

    wrapper.instance().inputDate(justRightEnd);
    expect(wrapper.state().endDate).toBeTruthy();
    expect(wrapper.state().calOpen).toBeFalsy();
  });

  xit('should clear second entry of a booking where the start is after the end', () => {
    const wrapper = shallow(<Booking listing={basicListing()} />);
    const badStart = dateFromNow(5);
    const badEnd = dateFromNow(3);

    clickOnStartDateField(wrapper);
    wrapper.instance().inputDate(badStart);
    wrapper.instance().inputDate(badEnd);
    expect(wrapper.state().endDate).toBeFalsy();
    expect(wrapper.state().selecting).toBe(1);

    wrapper.instance().inputDate(badEnd);
    wrapper.instance().inputDate(badStart);
    expect(wrapper.state().endDate).toBeFalsy();
    expect(wrapper.state().selecting).toBe(1);
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

  xit('should be able to parse dates from strings in input field', () => {

  });

  xit('should store reservation dates as the start of a day', () => {

  });

});
