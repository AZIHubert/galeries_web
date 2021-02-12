import * as React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '#contexts/ThemeContext';

import ModalConfirmLanding from '../index';

describe('ModalConfirmLanding', () => {
  it('renders without crashing', () => {
    const mockedSetErrorModal = jest.fn;
    const tree = renderer.create(
      <ThemeProvider>
        <ModalConfirmLanding
          setErrorModal={mockedSetErrorModal}
          currentEmail='mockedEmail@email.com'
        />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
