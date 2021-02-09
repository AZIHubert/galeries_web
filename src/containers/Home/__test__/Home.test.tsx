import * as React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '#contexts/ThemeContext';

import Home from '../index';

describe('Home', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
