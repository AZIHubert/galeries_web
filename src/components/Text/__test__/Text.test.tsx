import {
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import theme from '#helpers/theme';

import Text from '../index';

type Color = 'black' | 'danger' | 'primary' | 'secondary' | 'tertiary' | 'white';
type FontStyle = 'lighter' | 'normal';
type FontWeight = 'bold' | 'normal';
type TextAlign = 'center' | 'justify' | 'left' | 'right';

const Container = ({
  color,
  fontSize,
  fontStyle,
  fontWeigth,
  textAlign,
}: {
  color?: Color;
  fontSize?: number;
  fontStyle?: FontStyle;
  fontWeigth?: FontWeight;
  textAlign?: TextAlign;
}) => (
  <ThemeProvider>
    <Text
      color={color}
      fontSize={fontSize}
      fontStyle={fontStyle}
      fontWeight={fontWeigth}
      testId='text'
      textAlign={textAlign}
    />
  </ThemeProvider>
);

describe('Text', () => {
  it('should render with default style', () => {
    const { getByTestId } = render(
      <Container />,
    );
    const text = getByTestId('text');
    expect(text).toHaveStyle(`color: ${theme.colors.black}`);
    expect(text).toHaveStyle('font-size: 1rem');
    expect(text).toHaveStyle('font-style: normal');
    expect(text).toHaveStyle('font-weight: normal');
    expect(text).toHaveStyle('text-align: left');
  });
  it('should set color', () => {
    const { getByTestId } = render(
      <Container
        color='primary'
      />,
    );
    expect(getByTestId('text')).toHaveStyle(`color: ${theme.colors.primary}`);
  });
  it('should set font-size', () => {
    const { getByTestId } = render(
      <Container
        fontSize={2}
      />,
    );
    expect(getByTestId('text')).toHaveStyle('font-size: 2rem');
  });
  it('should set font-style', () => {
    const { getByTestId } = render(
      <Container
        fontStyle='lighter'
      />,
    );
    expect(getByTestId('text')).toHaveStyle('font-style: lighter');
  });
  it('should set font-weight', () => {
    const { getByTestId } = render(
      <Container
        fontWeigth='bold'
      />,
    );
    expect(getByTestId('text')).toHaveStyle('font-weight: bold');
  });
  it('should set text-align', () => {
    const { getByTestId } = render(
      <Container
        textAlign='center'
      />,
    );
    expect(getByTestId('text')).toHaveStyle('text-align: center');
  });
});
