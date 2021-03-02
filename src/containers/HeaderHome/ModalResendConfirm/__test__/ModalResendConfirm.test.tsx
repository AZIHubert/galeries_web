import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import * as React from 'react';
import reactRedux, { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import {
  REQUIRED,
} from '#helpers/formErrors';
import reducers from '#store/reducers';
import {
  loadingSelector,
  sendConfirmationErrorSelector,
} from '#store/selectors';

import ModalResendConfirm from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ModalResendConfirm />
    </ThemeProvider>
  </Provider>
);

const email = 'email';
const form = 'form';

const mockedDispatch = jest.fn();
const mockedFetchSendConfirmation = jest.fn();
const mockedResendSendConfirmation = jest.fn();
const mockedSetSendConfirmation = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));
jest.mock('#store/actions/sendConfirmation.actions', () => ({
  fetchSendConfirmation: () => mockedFetchSendConfirmation,
  resetSendConfirmation: () => mockedResendSendConfirmation,
  setSendConfirmation: () => mockedSetSendConfirmation,
}));
jest.mock('#store/selectors/loading.selector', () => jest.fn());
jest.mock('#store/selectors/sendConfirmationError.selector', () => jest.fn());

describe('ModalResendConfirm', () => {
  beforeEach(() => {
    (sendConfirmationErrorSelector as jest.Mock).mockImplementation(() => ({
      email: '',
    }));
  });
  it('should reset sendConfirmation on unmout', () => {
    const { unmount } = render(<Container />);
    unmount();
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedResendSendConfirmation);
  });
  it('should reset and fetch sendConfirm on submit', async () => {
    const { getByTestId } = render(<Container />);
    fireEvent.change(getByTestId(email), {
      target: {
        value: 'user@email.com',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, mockedResendSendConfirmation);
      expect(mockedDispatch).toHaveBeenNthCalledWith(2, mockedFetchSendConfirmation);
    });
  });
  it('should not dispatch if loading', async () => {
    (loadingSelector as jest.Mock).mockImplementationOnce(() => ({
      loading: true,
    }));
    const { getByTestId } = render(<Container />);
    fireEvent.change(getByTestId(email), {
      target: {
        value: 'user@email.com',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(0);
    });
  });
  describe('should display error if', () => {
    describe('email', () => {
      it('is empty', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.blur(getByTestId(email));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('store sendConfirm error is not an empty string', () => {
        const error = 'email error';
        (sendConfirmationErrorSelector as jest.Mock).mockImplementation(() => ({
          email: error,
        }));
        const {
          getByTestId,
          getByText,
        } = render(<Container />);
        fireEvent.blur(getByTestId(email));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(email), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetSendConfirmation);
      });
    });
  });
});
