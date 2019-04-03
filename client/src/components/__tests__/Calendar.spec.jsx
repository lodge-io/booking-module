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
    const currYear = new Date(Date.now()).getFullYear();
    const currMonth = new Date(Date.now()).getMonth();
    let title = wrapper.find('.calTitleSpan');
    console.log(title.html());
    console.log(moment().format('MMMM'));
    expect(title.contains(moment().format('MMMM'))).toBeTruthy();

    const last = wrapper.find('.lastMonth');
    console.log(last.length);    
    console.log(wrapper.state());
    last.simulate('click');
    console.log(wrapper.state());
    console.log(moment().subtract(1, 'months').format('MMMM'));
    title = wrapper.find('.calTitleSpan');
    expect(title.contains(moment().subtract(1, 'months').format('MMMM'))).toBeTruthy();

  });
  
  it('renders correctly', () => {
    const tree = renderer
      .create(<Calendar />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

