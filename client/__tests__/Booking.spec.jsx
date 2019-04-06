import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Booking from '../src/components/Booking';
import { wrap } from 'module';

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
  it('should render the price of a listing', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    expect(wrapper.contains(120)).toBeTruthy();
  });

  it('should open calendar on click to a start date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);

    clickOnStartDateField(wrapper);
    expect(wrapper.state().calOpen).toBeTruthy();
    expect(wrapper.state().selecting).toBe(0);
  });

  it('should open calendar on click to a end date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    clickOnEndDateField(wrapper);
    expect(wrapper.state().calOpen).toBeTruthy();
    expect(wrapper.state().selecting).toBe(1);
  });

  it('should take a start date and switch to selecting end date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    clickOnStartDateField(wrapper);
    const date = dateFromNow(3);

    wrapper.instance().inputDate(date);
    expect(wrapper.state().startDate.format()).toEqual(date.format());
    expect(wrapper.state().selecting).toEqual(1);
  });

  it('should take an end date and switch to selecting start date', () => {
    const listing = basicListing();
    const wrapper = shallow(<Booking listing={listing} />);
    clickOnEndDateField(wrapper);
    const date = dateFromNow(5);

    wrapper.instance().inputDate(date);
    expect(wrapper.state().endDate.format()).toEqual(date.format());
    expect(wrapper.state().selecting).toEqual(0);
  });

  it('should reject dates from the past', () => {
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

  it('should reject dates which are already booked', () => {
    const listing = basicListing();
    const bookingStart = dateFromNow(3);
    const bookingEnd = dateFromNow(6);
    const badReserveTime = dateFromNow(3);
    const goodReserveTime = dateFromNow(6);
    listing.bookings.push({
      startDate: bookingStart,
      endDate: bookingEnd,
    });

    const wrapper = shallow(<Booking listing={listing} />);
    clickOnStartDateField(wrapper);
    wrapper.instance().inputDate(badReserveTime);
    expect(wrapper.state().startDate).toBeFalsy();
    wrapper.instance().inputDate(goodReserveTime);
    expect(wrapper.state().startDate.format()).toBe(goodReserveTime.format());
  });

  it('should reject bookings which have another booking in the middle', () => {
    const listing = basicListing();
    const bookingStart = dateFromNow(3);
    const bookingEnd = dateFromNow(6);
    const badStartTime = dateFromNow(2);
    const badEndTime = dateFromNow(7);
    listing.bookings.push({
      startDate: bookingStart,
      endDate: bookingEnd,
    });

    const wrapper = shallow(<Booking listing={listing} />);
    clickOnStartDateField(wrapper);
    wrapper.instance().inputDate(badStartTime);
    wrapper.instance().inputDate(badEndTime);
    expect(wrapper.state().endDate).toBeFalsy();
    expect(wrapper.state().selecting).toBe(1);
  });

  it('should reject bookings which do not meet required length', () => {
    const listing = basicListing();
    listing.requirements = { minBookingLength: 5, maxBookingLength: 30 };
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

  it('should clear second entry of a booking where the start is after the end', () => {
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

  xit('should close calendar and show price calc after a valid range has been selected', () => {
    const wrapper = shallow(<Booking listing={basicListing()} />);
    const start = dateFromNow(3);
    const end = dateFromNow(6);

    clickOnStartDateField(wrapper);
    wrapper.instance().inputDate(start);
    wrapper.instance().inputDate(end);
    expect(wrapper.state().calOpen).toBeFalsy();
    expect(wrapper.state().showCost).toBeTruthy();
    expect(wrapper.find('.totalBookingCost').contains(360)).toBeTruthy();
  });

  xit('should correctly calculate price given fees and taxes', () => {
    const listing = basicListing();
    listing.fees = { 'Cleaning Fee': 20 };
    listing.taxes = [{ name: 'Flat Tax', type: 'flat', amount: 30 },
      { name: 'Percent Tax', type: 'percent', rate: 0.0815 }];

    const wrapper = shallow(<Booking listing={listing} />);
    const startDay = 3;
    const endDay = 6;
    const start = dateFromNow(startDay);
    const end = dateFromNow(endDay);

    clickOnStartDateField(wrapper);
    wrapper.instance().inputDate(start);
    wrapper.instance().inputDate(end);
    expect(wrapper.state().calOpen).toBeFalsy();
    expect(wrapper.state().showCost).toBeTruthy();
    const total = (
      (endDay - startDay) * listing.price + listing.fees['Cleaning Fee']
    )
    * (1 + listing.taxes[1].rate)
    + listing.taxes[0].amount;

    expect(wrapper.find('.totalBookingCost').contains(total)).toBeTruthy();
  });

  xit('on booking button press with invalid range, should open calendar with first date selecting', () => {
    const wrapper = shallow(<Booking listing={basicListing()} />);
    const start = dateFromNow(4);
    const end = dateFromNow(3);
    wrapper.instance().setState({startDate: start, endDate: end });
    wrapper.find('.bookButton').first().simulate('click');
    expect(wrapper.state().endDate).toBeFalsy();
    expect(wrapper.state().selecting).toBe(1);
  });

  xit('on booking button press with valid booking, should post to server', () => {
    
  });

  xit('should be able to parse dates from strings in input field', () => {
    const wrapper = shallow(<Booking listing={basicListing()} />);
    const dateStr = '01/01/2019';
    clickOnStartDateField(wrapper);
    wrapper.find('.dateSelectStart').simulate('change', { target: { value: dateStr } });
    
    expect(wrapper.state().startDate).toBe(moment(dateStr));
    expect(wrapper.state().selecting).toBe(1);

  });

  xit('should ignore invalid dates in input field', () => {
    const wrapper = shallow(<Booking listing={basicListing()} />);
    const dateStr = '14/01/2019';
    clickOnStartDateField(wrapper);
    wrapper.find('.dateSelectStart').simulate('change', { target: { value: dateStr } });

    expect(wrapper.state().startDate).toBeFalsy();
    expect(wrapper.state().selecting).toBe(0);
  });
});
