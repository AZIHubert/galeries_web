import {
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import TextSeparator from '../index';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface ContainerI {
  small?: boolean;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
}

const Container = ({
  styles,
}: ContainerI) => (
  <ThemeProvider>
    <TextSeparator
      styles={styles}
      text='text'
    />
  </ThemeProvider>
);

describe('TextSeparator', () => {
  it('should render with text', () => {
    const { getByText } = render(
      <Container />,
    );
    expect(getByText('text')).toBeTruthy();
  });
  it('should render with default style', () => {
    const { getByText } = render(
      <Container />,
    );
    expect(getByText('text')).toHaveStyle('margin: 0px 0px 0px 0px');
  });
  it('should set margin-bottom', () => {
    const { getByText } = render(
      <Container
        styles={{
          marginBottom: 10,
        }}
      />,
    );
    expect(getByText('text')).toHaveStyle('margin: 0px 0px 10px 0px');
  });
  it('should set margin-top', () => {
    const { getByText } = render(
      <Container
        styles={{
          marginTop: 10,
        }}
      />,
    );
    expect(getByText('text')).toHaveStyle('margin: 10px 0px 0px 0px');
  });
});
