import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Calendar from '../src/components/Calendar';

const utcMoment = moment.utc;

describe('Calendar', () => {
  it('renders in the dom', () => {
    const res = shallow(<Calendar bookings={[]} />).find('.calTitleSpan').contains(2019);
    expect(res).toBeTruthy();
  });

  it('should log when a date is hovered, clicked or focused', () => {

    const mockListener = jest.fn(() => {});

    const wrapper = mount(<Calendar bookings={[]} inputDate={mockListener}/>);
    const dates = wrapper.find('.clickableDate');
    dates.at(0).simulate('click');
    dates.at(5).simulate('click');
    dates.at(23).simulate('click');
    dates.at(11).simulate('click');

    expect(mockListener.mock.calls.length).toBe(4);
    expect(mockListener.mock.calls[0][0] instanceof moment).toBeTruthy();
    expect(mockListener.mock.calls[1][0] instanceof moment).toBeTruthy();
    expect(mockListener.mock.calls[2][0] instanceof moment).toBeTruthy();
    expect(mockListener.mock.calls[3][0] instanceof moment).toBeTruthy();
    wrapper.unmount();
  });

  it('should change month when next/last button clicked', () => {
    const wrapper = shallow(<Calendar bookings={[]} />);
    let testYear = new Date(Date.now()).getFullYear();
    let testMonth = moment().format('MMMM');
    let title = wrapper.find('.calTitleSpan');
    expect(title.contains(testYear)).toBeTruthy();
    expect(title.contains(testMonth)).toBeTruthy();

    const last = wrapper.find('.lastMonth');
    const next = wrapper.find('.nextMonth');
    last.simulate('click');
    title = wrapper.find('.calTitleSpan');
    testMonth = moment().subtract(1, 'months').format('MMMM');
    expect(title.contains(testMonth)).toBeTruthy();

    for (let i = 0; i < 11; i += 1) {
      last.simulate('click');
    }
    title = wrapper.find('.calTitleSpan');
    testYear = parseInt(moment().subtract(1, 'years').format('YYYY'), 10);

    expect(title.contains(testYear)).toBeTruthy();

    next.simulate('click');
    title = wrapper.find('.calTitleSpan');
    testMonth = moment().add(1, 'months').format('MMMM');
    expect(title.contains(testMonth)).toBeTruthy();
    expect(title.contains(testYear)).toBeTruthy();
    for (let i = 0; i < 11; i += 1) {
      next.simulate('click');
    }

    title = wrapper.find('.calTitleSpan');
    testMonth = moment().format('MMMM');
    testYear = parseInt(moment().format('YYYY'), 10);
    expect(title.contains(testMonth)).toBeTruthy();
    expect(title.contains(testYear)).toBeTruthy();  
  });

  it('should disable days in the past if no bookings', () => {
    const allDaysWrapper = mount(<Calendar bookings={[]} />);
    expect(allDaysWrapper.find('TableD').length).toBeGreaterThanOrEqual(utcMoment().daysInMonth() - utcMoment().date() + 1);
    expect(allDaysWrapper.find('TableDDisabled').length).toBe(utcMoment().date() - 1);
    allDaysWrapper.unmount();
  });

  it('should disable dates which are covered by another booking', () => {
    const bookings = [{
      startDate: utcMoment().startOf('day').subtract(32, 'days'),
      endDate: utcMoment().startOf('day').add(32, 'days'),
    }];
    const noDaysWrapper = mount(<Calendar bookings={bookings} />);
    expect(noDaysWrapper.find('TableDDisabled').length).toBeGreaterThanOrEqual(utcMoment().daysInMonth());
    expect(noDaysWrapper.find('TableD').length).toBe(0);
    noDaysWrapper.unmount();
  });

  it('should correctly handle rendering dates past the last booking', () => {
    const bookingLength = 20;
    const bookings = [{
      startDate: utcMoment().startOf('month'),
      endDate: utcMoment().startOf('month').add(bookingLength, 'days'),
    }];
    const noDaysWrapper = mount(<Calendar bookings={bookings} selecting={0} />);
    const takenDays = Math.max(utcMoment().date() - 1, bookingLength);
    const openDays = utcMoment().daysInMonth() - takenDays;
    expect(noDaysWrapper.find('TableDDisabled').length).toBe(takenDays);
    expect(noDaysWrapper.find('TableD').length).toBe(openDays);
    noDaysWrapper.unmount();
  });

  it('should correctly handle rendering dates past the last booking', () => {
    const bookingLength = 20;
    const bookings = [{
      startDate: utcMoment().startOf('month'),
      endDate: utcMoment().startOf('month').add(bookingLength, 'days'),
    }];
    const noDaysWrapper = mount(<Calendar bookings={bookings} selecting={1} />);
    const takenDays = Math.max(utcMoment().date() - 1, bookingLength + 1);
    const openDays = utcMoment().daysInMonth() - takenDays;
    expect(noDaysWrapper.find('TableDDisabled').length).toBe(takenDays);
    expect(noDaysWrapper.find('TableD').length).toBe(openDays);
    noDaysWrapper.unmount();
  });




  it('renders correctly', () => {
    const tree = renderer
      .create(<Calendar bookings={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
