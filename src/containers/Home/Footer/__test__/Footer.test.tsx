import * as React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../index';

describe('Footer', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
