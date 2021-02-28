import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import {
  CONFIRM_PASSWORD,
  HAS_SPACES,
  MAX_LENGTH_THRITY,
  MIN_LENGTH_OF_HEIGH,
  PASSWORD,
  REQUIRED,
} from '#helpers/formErrors';
import reducers from '#store/reducers';

import ChangePassword from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ChangePassword />
    </ThemeProvider>
  </Provider>
);

describe('ChangePassword', () => {
  let confirmNewPassword: HTMLElement;
  let currentPassword: HTMLElement;
  let newPassword: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    confirmNewPassword = getByTestId('confirmNewPassword');
    currentPassword = getByTestId('currentPassword');
    newPassword = getByTestId('newPassword');
  });
  describe('should display error', () => {
    describe('if current password', () => {
      it('is empty', async () => {
        fireEvent.blur(currentPassword);
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
    });
    describe('if new password', () => {
      it('is empty', async () => {
        fireEvent.blur(newPassword);
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('has spaces', async () => {
        fireEvent.change(newPassword, {
          target: {
            value: 'has spaces',
          },
        });
        fireEvent.blur(newPassword);
        const error = await screen.findByText(HAS_SPACES);
        expect(error).toBeTruthy();
      });
      it('is less than 8 characters', async () => {
        fireEvent.change(newPassword, {
          target: {
            value: 'aaa',
          },
        });
        fireEvent.blur(newPassword);
        const error = await screen.findByText(MIN_LENGTH_OF_HEIGH);
        expect(error).toBeTruthy();
      });
      it('is more than 30 characters', async () => {
        fireEvent.change(newPassword, {
          target: {
            value: 'a'.repeat(31),
          },
        });
        fireEvent.blur(newPassword);
        const error = await screen.findByText(MAX_LENGTH_THRITY);
        expect(error).toBeTruthy();
      });
      it('doesn\'t containe uppercase', async () => {
        fireEvent.change(newPassword, {
          target: {
            value: 'password0!',
          },
        });
        fireEvent.blur(newPassword);
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t containe lowercase', async () => {
        fireEvent.change(newPassword, {
          target: {
            value: 'PASSWORD0!',
          },
        });
        fireEvent.blur(newPassword);
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t contain number', async () => {
        fireEvent.change(newPassword, {
          target: {
            value: 'Password!',
          },
        });
        fireEvent.blur(newPassword);
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t contain special char', async () => {
        fireEvent.change(newPassword, {
          target: {
            value: 'Password0',
          },
        });
        fireEvent.blur(newPassword);
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
    });
    describe('if confirm new password', () => {
      it('is empty', async () => {
        fireEvent.blur(confirmNewPassword);
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('not match new password', () => {
        fireEvent.change(newPassword, {
          target: {
            value: 'Password0!',
          },
        });
        fireEvent.change(confirmNewPassword, {
          target: {
            value: 'wrong password',
          },
        });
        const error = screen.findByText(CONFIRM_PASSWORD);
        expect(error).toBeTruthy();
      });
    });
  });
});
