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
  MAX_LENGTH_THRITY,
  MAX_LENGTH_TWO_HUNDRER,
  MIN_LENGTH_OF_FIVE,
  MIN_LENGTH_OF_TEN,
  REQUIRED,
} from '#helpers/formErrors';
import reducers from '#store/reducers';

import ModalTicket from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ModalTicket />
    </ThemeProvider>
  </Provider>
);

describe('ModalTicket', () => {
  let body: HTMLElement;
  let header: HTMLElement;
  afterEach(cleanup);
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    body = getByTestId('body');
    header = getByTestId('header');
  });
  describe('should display error', () => {
    describe('if body', () => {
      it('is empty', async () => {
        fireEvent.blur(body);
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('is less than 10 characters', async () => {
        fireEvent.change(body, {
          target: {
            value: 'a'.repeat(9),
          },
        });
        fireEvent.blur(body);
        const error = await screen.findByText(MIN_LENGTH_OF_TEN);
        expect(error).toBeTruthy();
      });
      it('is more than 200 characters', async () => {
        fireEvent.change(body, {
          target: {
            value: 'a'.repeat(300),
          },
        });
        fireEvent.blur(body);
        const error = await screen.findByText(MAX_LENGTH_TWO_HUNDRER);
        expect(error).toBeTruthy();
      });
    });
    describe('if header', () => {
      it('is empty', async () => {
        fireEvent.blur(header);
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('is less than 5 characters', async () => {
        fireEvent.change(header, {
          target: {
            value: 'a'.repeat(4),
          },
        });
        fireEvent.blur(header);
        const error = await screen.findByText(MIN_LENGTH_OF_FIVE);
        expect(error).toBeTruthy();
      });
      it('is more than 30 characters', async () => {
        fireEvent.change(header, {
          target: {
            value: 'a'.repeat(31),
          },
        });
        fireEvent.blur(header);
        const error = await screen.findByText(MAX_LENGTH_THRITY);
        expect(error).toBeTruthy();
      });
    });
  });
});
