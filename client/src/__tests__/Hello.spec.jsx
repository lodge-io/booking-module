import * as React from 'react';
import { shallow } from 'enzyme';
import App from '../App2.jsx';

it('renders in the dom', () => {
  const res = shallow(<App />).contains(<div>asdf</div>);
  expect(res).toBeTruthy(); 
});