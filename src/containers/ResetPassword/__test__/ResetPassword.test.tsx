import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import * as React from 'react';
import reactRedux, { Provider } from 'react-redux';
import ReactRouterDOM from 'react-router-dom';
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
import {
  loadingSelector,
  resetPasswordErrorSelector,
  resetPasswordStatusSelector,
} from '#store/selectors';

import ResetPassword from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ResetPassword />
    </ThemeProvider>
  </Provider>
);

const confirmPassword = 'confirmPassword';
const form = 'form';
const password = 'password';

const mockedDispatch = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedFetchResetPassword = jest.fn();
const mockedResetResetPassword = jest.fn();
const mockedSetResetPassword = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDOM,
  Link: jest.fn(({ children }) => children),
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  useParams: () => ({
    token: 'token',
  }),
}));
jest.mock('#store/actions/resetPassword.actions', () => ({
  fetchResetPassword: () => mockedFetchResetPassword,
  resetResetPassword: () => mockedResetResetPassword,
  setResetPassword: () => mockedSetResetPassword,
}));
jest.mock('#store/selectors/loading.selector', () => jest.fn());
jest.mock('#store/selectors/resetPasswordError.selector', () => jest.fn());
jest.mock('#store/selectors/resetPasswordStatus.selector', () => jest.fn());

describe('ResetPassword', () => {
  beforeEach(() => {
    (resetPasswordErrorSelector as jest.Mock).mockImplementation(() => ({
      confirmPassword: '',
      password: '',
    }));
    (resetPasswordStatusSelector as jest.Mock).mockImplementation(() => 'pending');
  });
  it('should reset resetPassword on unmout', () => {
    const { unmount } = render(<Container />);
    unmount();
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedResetResetPassword);
  });
  it('should call history.push if resetPasswordStatus === success', () => {
    (resetPasswordStatusSelector as jest.Mock).mockImplementation(() => 'success');
    render(<Container />);
    expect(mockedHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockedHistoryPush).toHaveBeenCalledWith('/');
  });
  it('should reset and fetch resetPassword on submit', async () => {
    const value = 'Password0!';
    const { getByTestId } = render(<Container />);
    fireEvent.change(getByTestId(password), {
      target: {
        value,
      },
    });
    fireEvent.change(getByTestId(confirmPassword), {
      target: {
        value,
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(1);
      expect(mockedDispatch).toHaveBeenCalledWith(mockedFetchResetPassword);
    });
  });
  it('should not dispatch on submit if loading is true', async () => {
    (loadingSelector as jest.Mock).mockImplementation(() => true);
    const value = 'Password0!';
    const { getByTestId } = render(<Container />);
    fireEvent.change(getByTestId(password), {
      target: {
        value,
      },
    });
    fireEvent.change(getByTestId(confirmPassword), {
      target: {
        value,
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(0);
    });
  });
  describe('should display error if', () => {
    describe('password', () => {
      it('is empty', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('has spaces', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'password with spaces',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(HAS_SPACES);
        expect(error).toBeTruthy();
      });
      it('has less than 8 characters', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'a'.repeat(7),
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(MIN_LENGTH_OF_HEIGH);
        expect(error).toBeTruthy();
      });
      it('has more than 30 characters', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'a'.repeat(31),
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(MAX_LENGTH_THRITY);
        expect(error).toBeTruthy();
      });
      it('doesn\'t containe uppercase', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'password0!',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t containe lowercase', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'PASSWORD0!',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t containe number', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'Password!',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t containe special char', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'Password0',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('store value resetPassword.password is not an empty string', () => {
        const error = 'password error';
        (resetPasswordErrorSelector as jest.Mock).mockImplementation(() => ({
          confirmPassword: '',
          password: error,
        }));
        const {
          getByTestId,
          getByText,
        } = render(<Container />);
        fireEvent.blur(getByTestId(password));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetResetPassword);
      });
    });
    describe('confirm password', () => {
      it('is empty', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.blur(getByTestId(confirmPassword));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('doesn\'t match password', async () => {
        const { getByTestId } = render(<Container />);
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'Password0!',
          },
        });
        fireEvent.change(getByTestId(confirmPassword), {
          target: {
            value: 'wrongPassword',
          },
        });
        fireEvent.blur(getByTestId(confirmPassword));
        const error = await screen.findByText(CONFIRM_PASSWORD);
        expect(error).toBeTruthy();
      });
      it('store value resetPassword.confirmPassword is not an empty string', () => {
        const error = 'confirmPassword error';
        (resetPasswordErrorSelector as jest.Mock).mockImplementation(() => ({
          confirmPassword: error,
          password: '',
        }));
        const {
          getByTestId,
          getByText,
        } = render(<Container />);
        fireEvent.blur(getByTestId(confirmPassword));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(confirmPassword), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetResetPassword);
      });
    });
  });
});
