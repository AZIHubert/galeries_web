import {
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import theme from '#helpers/theme';

import ModalCallback from '../index';

type Variant = 'error' | 'primary';

const Container = ({
  text,
  variant = 'primary',
}: {
  text: string;
  variant?: Variant;
}) => (
  <ThemeProvider>
    <ModalCallback
      backgroundTestId='background'
      innerContainerTestId='innerContainer'
      text={text}
      variant={variant}
    />
  </ThemeProvider>
);

describe('ModalCallback', () => {
  it('should display text', () => {
    const { getByText } = render(
      <Container
        text='text'
      />,
    );
    expect(getByText('text')).toBeTruthy();
  });
  it('should be primary variant', () => {
    const { getByTestId } = render(
      <Container
        text='text'
      />,
    );
    const innerContainer = getByTestId('innerContainer');
    expect(innerContainer).toHaveStyle(`border: 3px solid ${theme.colors.primary}`);
    expect(innerContainer).toHaveStyle(`color: ${theme.colors.primary}`);
    expect(getByTestId('background')).toHaveStyle(`background-color: ${theme.colors.primary}`);
  });
  it('should be secondary variant', () => {
    const { getByTestId } = render(
      <Container
        text='text'
        variant='error'
      />,
    );
    const innerContainer = getByTestId('innerContainer');
    expect(innerContainer).toHaveStyle(`border: 3px solid ${theme.colors.danger}`);
    expect(innerContainer).toHaveStyle(`color: ${theme.colors.danger}`);
    expect(getByTestId('background')).toHaveStyle(`background-color: ${theme.colors.danger}`);
  });
});
