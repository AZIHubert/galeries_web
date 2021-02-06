import * as React from 'react';
import renderer from 'react-test-renderer';

import ProfilePictureContainer from '../index';

describe('ProfilePictureContainer', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<ProfilePictureContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
