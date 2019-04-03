import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Calendar from '../Calendar';

it('renders in the dom', () => {
  const res = shallow(<Calendar />).contains(2019);
  expect(res).toBeTruthy();
});

it('renders correctly', () => {
  const tree = renderer
    .create(<Calendar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
