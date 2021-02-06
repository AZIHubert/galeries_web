import * as React from 'react';
import renderer from 'react-test-renderer';

import ProfilePicture from '../index';

describe('ProfilePicture', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<ProfilePicture />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
