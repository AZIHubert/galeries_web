import {
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import ModalContainer from '../index';

type TextAlign = 'center' | 'end' | 'justify' | 'justify-all' | 'left' | 'match-parent' | 'right' | 'start';
type TitleWeight = 'bold' | 'normal';

const Container = ({
  title,
  titleMarginTop,
  titleSize,
  titleTextAlign,
  titleWeight,
}: {
  title?: string;
  titleMarginTop?: number;
  titleSize?: number;
  titleTextAlign?: TextAlign;
  titleWeight?: TitleWeight;
}) => (
  <ThemeProvider>
    <ModalContainer
      title={title}
      titleMarginTop={titleMarginTop}
      titleSize={titleSize}
      titleTextAlign={titleTextAlign}
      titleTestId='title'
      titleWeight={titleWeight}
    />
  </ThemeProvider>
);

describe('ModalContainer', () => {
  it('should not have title', () => {
    const { queryByTestId } = render(
      <Container />,
    );
    expect(queryByTestId('title')).toBeFalsy();
  });
  it('should have title with default attributes', () => {
    const { queryByText } = render(
      <Container
        title='title'
      />,
    );
    const title = queryByText('title');
    expect(title).toBeTruthy();
    expect(title).toHaveStyle('font-size: 1.3rem');
    expect(title).toHaveStyle('font-weight: normal');
    expect(title).toHaveStyle('margin-top: 0');
    expect(title).toHaveStyle('text-align: left');
  });
  it('should set title font-size', () => {
    const { queryByText } = render(
      <Container
        title='title'
        titleSize={2}
      />,
    );
    expect(queryByText('title')).toHaveStyle('font-size: 2rem');
  });
  it('should set title text-align', () => {
    const { queryByText } = render(
      <Container
        title='title'
        titleTextAlign='center'
      />,
    );
    expect(queryByText('title')).toHaveStyle('text-align: center');
  });
  it('should set title font-weight', () => {
    const { queryByText } = render(
      <Container
        title='title'
        titleWeight='bold'
      />,
    );
    expect(queryByText('title')).toHaveStyle('font-weight: bold');
  });
  it('should set title margin-top', () => {
    const { queryByText } = render(
      <Container
        title='title'
        titleMarginTop={40}
      />,
    );
    expect(queryByText('title')).toHaveStyle('margin-top: 40px');
  });
});
