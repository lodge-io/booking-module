import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Calendar from '../Calendar';
import { wrap } from 'module';

describe('Calendar', () => {
  it('renders in the dom', () => {
    const res = shallow(<Calendar />).find('.calTitleSpan').contains(2019);
    expect(res).toBeTruthy();
  });
  
  it('should log when a date is hovered, clicked or focused', () => {
    const oldLog = console.log;
    const mockLog = jest.fn((...a)=>{});

    console.log = mockLog;
    const wrapper = shallow(<Calendar />);
    const dates = wrapper.find('.a-date');
    dates.at(0).simulate('click');
    dates.at(5).simulate('click');
    dates.at(23).simulate('click');
    dates.at(11).simulate('click');

    dates.at(0).simulate('mouseover');
    dates.at(5).simulate('mouseover');
    dates.at(13).simulate('mouseover');
    dates.at(18).simulate('mouseover');

    dates.at(0).simulate('focus');
    dates.at(5).simulate('focus');
    dates.at(13).simulate('focus');
    dates.at(18).simulate('focus');

    expect(mockLog.mock.calls.length).toBe(12);
    expect(mockLog.mock.calls[0][0]).toBe(1);
    expect(mockLog.mock.calls[1][0]).toBe(6);
    expect(mockLog.mock.calls[2][0]).toBe(24);
    expect(mockLog.mock.calls[3][0]).toBe(12);
    console.log = oldLog;
  });

  it('should change month when next/last button clicked', () => {
    const wrapper = shallow(<Calendar />);
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
    
    for (var i = 0; i < 11; i += 1) {
      last.simulate('click');
    }
    
    title = wrapper.find('.calTitleSpan');
    testYear = parseInt(moment().subtract(1, 'years').format('YYYY'));

    expect(title.contains(testYear)).toBeTruthy();

    next.simulate('click');
    title = wrapper.find('.calTitleSpan');
    testMonth = moment().add(1, 'months').format('MMMM');
    expect(title.contains(testMonth)).toBeTruthy();
    expect(title.contains(testYear)).toBeTruthy();
    for (var i = 0; i < 11; i += 1) {
      next.simulate('click');
    }

    title = wrapper.find('.calTitleSpan');
    testMonth = moment().format('MMMM');
    testYear = parseInt(moment().format('YYYY'));
    expect(title.contains(testMonth)).toBeTruthy();
    expect(title.contains(testYear)).toBeTruthy();

    
  });
  
  it('renders correctly', () => {
    const tree = renderer
      .create(<Calendar />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

