import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Calendar from '../src/components/Calendar';

describe('Calendar', () => {
  it('renders in the dom', () => {
    const res = shallow(<Calendar />).find('.calTitleSpan').contains(2019);
    expect(res).toBeTruthy();
  });

  it('should log when a date is hovered, clicked or focused', () => {

    const mockListener = jest.fn(() => {});

    const wrapper = shallow(<Calendar inputDate={mockListener}/>);
    const dates = wrapper.find('.a-date');
    dates.at(0).simulate('click');
    dates.at(5).simulate('click');
    dates.at(23).simulate('click');
    dates.at(11).simulate('click');

    expect(mockListener.mock.calls.length).toBe(4);
    expect(mockListener.mock.calls[0][0] instanceof moment).toBeTruthy();
    expect(mockListener.mock.calls[1][0] instanceof moment).toBeTruthy();
    expect(mockListener.mock.calls[2][0] instanceof moment).toBeTruthy();
    expect(mockListener.mock.calls[3][0] instanceof moment).toBeTruthy();
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

  it('renders correctly', () => {
    const tree = renderer
      .create(<Calendar />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
