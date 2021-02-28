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
import {
  REQUIRED,
} from '#helpers/formErrors';
import reducers from '#store/reducers';

import ModalDelete from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ModalDelete />
    </ThemeProvider>
  </Provider>
);

describe('ModalDelete', () => {
  afterEach(cleanup);
  describe('should display error if', () => {
    describe('if password', () => {
      it('is empty', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.blur(getByTestId('field'));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
    });
  });
});
