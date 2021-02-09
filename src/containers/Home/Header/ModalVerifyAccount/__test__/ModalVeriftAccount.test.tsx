import * as React from 'react';
import renderer from 'react-test-renderer';

import ThemeProvider from '#contexts/ThemeContext';

import ModalVerifyAccount from '../index';

describe('Home', () => {
  it('renders without crashing', () => {
    const mockedSetLoading = jest.fn;
    const tree = renderer.create(
      <ThemeProvider>
        <ModalVerifyAccount
          loading={false}
          setLoading={mockedSetLoading}
          currentEmail='mockedEmail@email.com'
        />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
