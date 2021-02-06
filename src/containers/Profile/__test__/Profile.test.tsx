import * as React from 'react';
import renderer from 'react-test-renderer';

import Profile from '../index';

describe('Profile', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
