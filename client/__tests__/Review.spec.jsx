import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Review from '../src/components/Review';

describe('Review', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Review numReviews={123} avgReview={3.5} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('should render the correct number of stars', () => {

  });

  xit('should display the correct number of reviews', () => {

  });
});
