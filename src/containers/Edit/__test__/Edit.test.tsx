import * as React from 'react';
import renderer from 'react-test-renderer';

import Edit from '../index';

describe('Edit', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<Edit />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
