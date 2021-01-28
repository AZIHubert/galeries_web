import * as React from 'react';
import renderer from 'react-test-renderer';

import Home from '../index';

describe('Home', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
