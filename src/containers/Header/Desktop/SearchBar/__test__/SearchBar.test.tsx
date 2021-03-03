import {
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import SearchBar from '../index';

const inputTestId = 'input';
const containerTestId = 'container';

const Container = () => (
  <ThemeProvider>
    <SearchBar
      containerTestId={containerTestId}
      inputTestId={inputTestId}
    />
  </ThemeProvider>
);

describe('SearchBar', () => {
  it('should change style on focus', () => {
    const { getByTestId, getByAltText } = render(<Container />);
    const container = getByTestId(containerTestId);
    const input = getByTestId(inputTestId);
    const pictogram = getByAltText('search pictogram');
    expect(container).toHaveStyle('opacity: 0.3');
    expect(pictogram).toHaveStyle('margin-right: 8px');
    expect(pictogram).toHaveStyle('width: 12px');
    input.focus();
    expect(container).toHaveStyle('opacity: 0.6');
    expect(pictogram).toHaveStyle('margin-right: 0px');
    expect(pictogram).toHaveStyle('width: 0px');
    input.blur();
    expect(container).toHaveStyle('opacity: 0.3');
    expect(pictogram).toHaveStyle('margin-right: 8px');
    expect(pictogram).toHaveStyle('width: 12px');
  });
});
