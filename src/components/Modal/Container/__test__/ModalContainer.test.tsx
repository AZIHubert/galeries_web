import {
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import ModalContainer from '../index';

const Container = ({
  title,
}: {
  title?: React.ReactNode;
}) => (
  <ThemeProvider>
    <ModalContainer
      title={title}
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
        title={(
          <p>
            title
          </p>
        )}
      />,
    );
    expect(queryByText('title')).toBeTruthy();
  });
});
