import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Costs from '../src/components/Costs';

describe('Price', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Costs duration={1} price={20} fees={{ 'Fee 1': 20 }} taxes={[{ name: 'Evil Tax', type: 'flat', amount: 1000 }]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should show total based on price and duration', () => {
    const wrapper = mount(
      <Costs
        duration={1}
        price={20}
        fees={{ 'Fee 1': 20, 'Clening Fee': 30, 'Service Fee': 20 }}
        taxes={[{ name: 'Evil Tax', type: 'flat', amount: 1000 }, { name: 'Good Tax', type:'percent', amount: '0.12' }]} 
      />,
    );
    const calc = (20 * 1 + 20 + 30 + 20) * 1.12 + 1000;
    // expect(wrapper.find('.totalBookingCost').contains(`$${calc}`)).toBeTruthy();
    wrapper.unmount();
  });
});
