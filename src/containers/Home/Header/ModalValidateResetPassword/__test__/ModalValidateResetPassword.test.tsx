import * as React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '#contexts/ThemeContext';

import ModalValidateResetPassword from '../index';

describe('ModalValidateResetPassword', () => {
  const mockedSetLoading = jest.fn;
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ModalValidateResetPassword
          loading={false}
          setLoading={mockedSetLoading}
          currentEmail='mockedEmail@email.com'
        />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
