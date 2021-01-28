import * as React from 'react';
import renderer from 'react-test-renderer';

import Body from '../index';

describe('Body', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<Body />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
