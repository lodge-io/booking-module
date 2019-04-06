import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import GuestSelect from '../src/components/GuestSelect';

function makeGuestObj() {
  return { adults: 1, children: 0, infants: 3 };
}

describe('GuestSelect', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<GuestSelect guests={makeGuestObj()} setGuestCount={() => {}} close={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('should invoke setGuestCount appropriately when button clicked', () => {

  });
});
