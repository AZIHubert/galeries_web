import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import { REQUIRED } from '#helpers/formErrors';
import reducers from '#store/reducers';

import ChangeEmail from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ChangeEmail />
    </ThemeProvider>
  </Provider>
);

describe('ChangeEmail', () => {
  let passwordInput: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    passwordInput = getByTestId('field');
  });
  afterEach(cleanup);
  describe('should display error if password', () => {
    it('is empty', async () => {
      fireEvent.blur(passwordInput);
      const error = await screen.findByText(REQUIRED);
      expect(error).toBeTruthy();
    });
  });
});
