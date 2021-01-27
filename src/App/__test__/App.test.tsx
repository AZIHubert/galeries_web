import * as React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import App from '../index';

describe('App', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
