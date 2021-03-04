import {
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import theme from '#helpers/theme';

import SocialMediaButton from '../index';

type Action = 'login' | 'signin';
type Variant = 'facebook' | 'google';

const Container = ({
  action,
  disabled,
  marginBottom,
  marginTop,
  variant,
}: {
  action?: Action;
  disabled?: boolean;
  marginBottom?: number;
  marginTop?: number;
  variant?: Variant;
}) => {
  const [click, setClick] = React.useState<boolean>(false);

  const handleClick = () => setClick(true);

  return (
    <ThemeProvider>
      <SocialMediaButton
        action={action}
        disabled={disabled}
        styles={{
          marginBottom,
          marginTop,
        }}
        onClick={handleClick}
        testId='button'
        variant={variant}
      />
      {click ? (
        <p>click</p>
      ) : null}
    </ThemeProvider>
  );
};

describe('SocialMediaButton', () => {
  it('should have default properties', () => {
    const { getByTestId } = render(
      <Container />,
    );
    expect(getByTestId('button')).toHaveStyle('margin: 0px 0px 0px 0px');
  });
  it('should have margin top', () => {
    const { getByTestId } = render(
      <Container
        marginTop={10}
      />,
    );
    expect(getByTestId('button')).toHaveStyle('margin: 10px 0px 0px 0px');
  });
  it('should have margin bottom', () => {
    const { getByTestId } = render(
      <Container
        marginBottom={10}
      />,
    );
    expect(getByTestId('button')).toHaveStyle('margin: 0px 0px 10px 0px');
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
  describe('should be a Facebook button and', () => {
    it('should have Facebook style', () => {
      const { getByTestId } = render(
        <Container />,
      );
      const button = getByTestId('button');
      expect(button).toHaveStyle(`background-color: ${theme.colors.facebook}`);
      expect(button).toHaveStyle(`border: 1px solid ${theme.colors.facebook}`);
      expect(button).toHaveStyle(`color: ${theme.colors.white}`);
    });
    it('should display \'Log in with Facebook\'', () => {
      const { getByTestId } = render(
        <Container
          action='login'
        />,
      );
      expect(getByTestId('button')).toHaveTextContent('Log in with Facebook');
    });
    it('should display \'Sign in with Facebook\'', () => {
      const { getByTestId } = render(
        <Container />,
      );
      expect(getByTestId('button')).toHaveTextContent('Sign in with Facebook');
    });
  });
  describe('should be a Google button and', () => {
    it('should have Google style', () => {
      const { getByTestId } = render(
        <Container
          variant='google'
        />,
      );
      const button = getByTestId('button');
      expect(button).toHaveStyle(`background-color: ${theme.colors.white}`);
      expect(button).toHaveStyle(`border: 1px solid ${theme.colors.black}`);
      expect(button).toHaveStyle(`color: ${theme.colors.black}`);
    });
    it('should display \'Log in with Google\'', () => {
      const { getByTestId } = render(
        <Container
          action='login'
          variant='google'
        />,
      );
      expect(getByTestId('button')).toHaveTextContent('Log in with Google');
    });
    it('should display \'Sign in with Google\'', () => {
      const { getByTestId } = render(
        <Container
          variant='google'
        />,
      );
      expect(getByTestId('button')).toHaveTextContent('Sign in with Google');
    });
  });
});
