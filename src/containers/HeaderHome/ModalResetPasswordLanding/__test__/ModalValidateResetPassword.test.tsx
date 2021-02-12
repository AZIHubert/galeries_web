import * as React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '#contexts/ThemeContext';

import ModalResetPasswordLanding from '../index';

describe('ModalResetPasswordLanding', () => {
  const mockedSetErrorModal = jest.fn;
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ModalResetPasswordLanding
          setErrorModal={mockedSetErrorModal}
          currentEmail='mockedEmail@email.com'
        />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
