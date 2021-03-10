import {
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import TextButton from '../index';

const Container = ({
  disabled,
  fontSize,
  justifyContent,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
}: {
  disabled?: boolean;
  fontSize?: number;
  justifyContent?: style.JustifyContent;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}) => {
  const [click, setClick] = React.useState<boolean>(false);
  const handleClick = () => setClick(true);
  return (
    <ThemeProvider>
      <TextButton
        buttonTestId='button'
        containerTestId='container'
        disabled={disabled}
        onClick={handleClick}
        styles={{
          fontSize,
          justifyContent,
          marginBottom,
          marginLeft,
          marginRight,
          marginTop,
        }}
        text='text'
        textButton='button'
      />
      {click ? (
        <p>click</p>
      ) : null}
    </ThemeProvider>
  );
};

describe('TextButton', () => {
  it('should render innertext', () => {
    const {
      getByTestId,
      getByText,
    } = render(
      <Container />,
    );
    expect(getByText('button')).toBeTruthy();
    expect(getByTestId('container')).toHaveTextContent('text button.');
  });
  it('should render with default style', () => {
    const {
      getByTestId,
    } = render(
      <Container />,
    );
    const container = getByTestId('container');
    expect(container).toHaveStyle('font-size: 1rem');
    expect(container).toHaveStyle('justify-content: flex-start');
    expect(container).toHaveStyle('margin-bottom: 0px');
    expect(container).toHaveStyle('margin-top: 0px');
  });
  it('should set font-size', () => {
    const {
      getByTestId,
    } = render(
      <Container
        fontSize={2}
      />,
    );
    expect(getByTestId('container')).toHaveStyle('font-size: 2rem');
  });
  it('should set justify-content', () => {
    const {
      getByTestId,
    } = render(
      <Container
        justifyContent='center'
      />,
    );
    expect(getByTestId('container')).toHaveStyle('justify-content: center');
  });
  it('should set margin-bottom', () => {
    const {
      getByTestId,
    } = render(
      <Container
        marginBottom={10}
      />,
    );
    expect(getByTestId('container')).toHaveStyle('margin: 0px 0px 10px 0px');
  });
  it('should set margin-left', () => {
    const {
      getByTestId,
    } = render(
      <Container
        marginLeft={10}
      />,
    );
    expect(getByTestId('container')).toHaveStyle('margin: 0px 0px 0px 10px');
  });
  it('should set margin-right', () => {
    const {
      getByTestId,
    } = render(
      <Container
        marginRight={10}
      />,
    );
    expect(getByTestId('container')).toHaveStyle('margin: 0px 10px 0px 0px');
  });
  it('should set margin-top', () => {
    const {
      getByTestId,
    } = render(
      <Container
        marginTop={10}
      />,
    );
    expect(getByTestId('container')).toHaveStyle('margin: 10px 0px 0px 0px');
  });
  it('should not be disabled by default', () => {
    const {
      getByTestId,
      getByText,
    } = render(
      <Container />,
    );
    fireEvent.click(getByTestId('button'));
    expect(getByText('click')).toBeTruthy();
  });
  it('should be disabled', () => {
    const {
      getByTestId,
      queryByText,
    } = render(
      <Container
        disabled
      />,
    );
    fireEvent.click(getByTestId('button'));
    expect(queryByText('click')).toBeFalsy();
  });
});
