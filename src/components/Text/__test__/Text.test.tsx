import {
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import theme from '#helpers/theme';

import Text from '../index';

type Color = style.Color;
type FontStyle = style.FontStyle;
type FontWeight = style.FontWeight;
type TextAlign = style.TextAlign;

const Container = ({
  color,
  fontSize,
  fontStyle,
  fontWeigth,
  lineHeight,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  textAlign,
}: {
  color?: Color;
  fontSize?: number;
  fontStyle?: FontStyle;
  fontWeigth?: FontWeight;
  lineHeight?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  textAlign?: TextAlign;
}) => (
  <ThemeProvider>
    <Text
      color={color}
      styles={{
        fontSize,
        lineHeight,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        textAlign,
      }}
      fontStyle={fontStyle}
      fontWeight={fontWeigth}
      testId='text'
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
    expect(text).toHaveStyle('line-height: normal');
    expect(text).toHaveStyle('margin-bottom: 0');
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
        fontStyle='italic'
      />,
    );
    expect(getByTestId('text')).toHaveStyle('font-style: italic');
  });
  it('should set font-weight', () => {
    const { getByTestId } = render(
      <Container
        fontWeigth='bold'
      />,
    );
    expect(getByTestId('text')).toHaveStyle('font-weight: bold');
  });
  it('should set line-height', () => {
    const { getByTestId } = render(
      <Container
        lineHeight={3}
      />,
    );
    expect(getByTestId('text')).toHaveStyle('line-height: 3rem');
  });
  it('should set margin-bottom', () => {
    const { getByTestId } = render(
      <Container
        marginBottom={10}
      />,
    );
    expect(getByTestId('text')).toHaveStyle('margin: 0px 0px 10px 0px');
  });
  it('should set margin-left', () => {
    const { getByTestId } = render(
      <Container
        marginLeft={10}
      />,
    );
    expect(getByTestId('text')).toHaveStyle('margin: 0px 0px 0px 10px');
  });
  it('should set margin-right', () => {
    const { getByTestId } = render(
      <Container
        marginRight={10}
      />,
    );
    expect(getByTestId('text')).toHaveStyle('margin: 0px 10px 0px 0px');
  });
  it('should set margin-top', () => {
    const { getByTestId } = render(
      <Container
        marginTop={10}
      />,
    );
    expect(getByTestId('text')).toHaveStyle('margin: 10px 0px 0px 0px');
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
