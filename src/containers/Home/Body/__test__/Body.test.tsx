import * as React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '#contexts/ThemeContext';

import Body from '../index';

describe('Body', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Body />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
