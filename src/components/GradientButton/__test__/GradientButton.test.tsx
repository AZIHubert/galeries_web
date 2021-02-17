import {
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import GradientButton from '../index';

const Container = ({
  disabled = false,
  title,
}: {
  disabled?: boolean;
  title: string;
}) => {
  const [click, setClick] = React.useState<boolean>(false);
  const handleClick = () => setClick(true);
  return (
    <ThemeProvider>
      <GradientButton
        disabled={disabled}
        title={title}
        type='button'
        onClick={handleClick}
      />
      {click ? (
        <p>click</p>
      ) : null}
    </ThemeProvider>
  );
};

describe('GradientButton', () => {
  it('should display title', () => {
    const { getByText } = render(
      <Container
        title='title'
      />,
    );
    expect(getByText('title')).toBeTruthy();
  });
  it('should be loading', () => {
    const {
      getByText,
    } = render(
      <Container
        disabled
        title='title'
      />,
    );
    expect(getByText('loading')).toBeTruthy();
  });
  it('should not trigger if disabled', () => {
    const {
      getByText,
      queryByText,
    } = render(
      <Container
        disabled
        title='title'
      />,
    );
    fireEvent.click(getByText('loading'));
    expect(queryByText('click')).toBeFalsy();
  });
});
