import {
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import theme from '#helpers/theme';

import HeaderButton from '../index';

type Variant = 'primary' | 'secondary';

const Container = ({
  small,
  title,
  variant = 'primary',
}: {
  small?: boolean;
  title: string;
  variant?: Variant
}) => (
  <ThemeProvider>
    <HeaderButton
      small={small}
      title={title}
      variant={variant}
    />
  </ThemeProvider>
);

describe('HeaderButton', () => {
  it('should display title', () => {
    const { getByText } = render(
      <Container
        title='title'
      />,
    );
    expect(getByText('title')).toBeTruthy();
  });
  it('should be primary variant', () => {
    const { getByText } = render(
      <Container
        title='title'
      />,
    );
    expect(getByText('title')).toHaveStyle(`background-color: ${theme.colors.primary}`);
    expect(getByText('title')).toHaveStyle(`color: ${theme.colors.secondary}`);
  });
  it('should be primary variant', () => {
    const { getByText } = render(
      <Container
        title='title'
        variant='secondary'
      />,
    );
    expect(getByText('title')).toHaveStyle(`background-color: ${theme.colors.secondary}`);
    expect(getByText('title')).toHaveStyle(`color: ${theme.colors.primary}`);
  });
  it('should be small', () => {
    const { getByText } = render(
      <Container
        small
        title='title'
      />,
    );
    expect(getByText('title')).toHaveStyle('font-size: 0.6rem');
    expect(getByText('title')).toHaveStyle('padding: 3px 10px');
  });
});
