import * as React from 'react';
import renderer from 'react-test-renderer';

import Desktop from '../index';

describe('Desktop', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<Desktop />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
