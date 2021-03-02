import {
  cleanup,
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
  loginErrorSelector,
  loginStatusSelector,
  notificationSelector,
} from '#store/selectors';

import ModalLogin from '../index';

const mockedStore = createStore(reducers);

const Container = ({
  setCurrentModal,
}: {
  setCurrentModal: () => {}
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ModalLogin
        setCurrentModal={setCurrentModal}
      />
    </ThemeProvider>
  </Provider>
);

const form = 'form';
const password = 'password';
const userNameOrEmail = 'userNameOrEmail';

const mockedDispatch = jest.fn();
const mockedFetchLogin = jest.fn();
const mockedResetLogin = jest.fn();
const mockedSetLogin = jest.fn();
const mockedSetCurrentModal = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));
jest.mock('#store/actions/login.actions', () => ({
  fetchLogin: () => mockedFetchLogin,
  resetLogin: () => mockedResetLogin,
  setLogin: () => mockedSetLogin,
}));
jest.mock('#store/selectors/loading.selector', () => jest.fn());
jest.mock('#store/selectors/loginError.selector', () => jest.fn());
jest.mock('#store/selectors/loginStatus.selector', () => jest.fn());
jest.mock('#store/selectors/notification.selector', () => jest.fn());

const script = document.createElement('script');
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

describe('ModalLogin', () => {
  beforeEach(() => {
    (loginErrorSelector as jest.Mock).mockImplementation(() => ({
      userNameOrEmail: '',
      password: '',
    }));
    (loginStatusSelector as jest.Mock).mockImplementation(() => 'pending');
    (notificationSelector as jest.Mock).mockImplementation(() => ({
      errors: false,
      text: '',
    }));
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it('should reset login on unmount', () => {
    const { unmount } = render(
      <Container
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    unmount();
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedResetLogin);
  });
  it('should reset and fetch login on submit', async () => {
    const { getByTestId } = render(
      <Container
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    fireEvent.change(getByTestId(userNameOrEmail), {
      target: {
        value: 'userNameOrEmail',
      },
    });
    fireEvent.change(getByTestId(password), {
      target: {
        value: 'password',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, mockedResetLogin);
      expect(mockedDispatch).toHaveBeenNthCalledWith(2, mockedFetchLogin);
    });
  });
  it('should not dispatch if loading', async () => {
    (loadingSelector as jest.Mock).mockImplementationOnce(() => ({
      loading: true,
    }));
    const { getByTestId } = render(
      <Container
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    fireEvent.change(getByTestId(userNameOrEmail), {
      target: {
        value: 'userNameOrEmail',
      },
    });
    fireEvent.change(getByTestId(password), {
      target: {
        value: 'password',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(0);
    });
  });
  it('should trigger setCurrentModal', () => {
    (notificationSelector as jest.Mock).mockImplementation(() => ({
      error: true,
      text: 'You\'re account need to be confimed',
    }));
    (loginStatusSelector as jest.Mock).mockImplementation(() => 'error');
    render(
      <Container
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    expect(mockedSetCurrentModal).toHaveBeenCalled();
    expect(mockedSetCurrentModal).toHaveBeenNthCalledWith(1, 'resendConfirm');
  });
  describe('should display error if', () => {
    describe('userNameOrEmail', () => {
      it('is empty', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(userNameOrEmail));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('store login error is not an empty string', () => {
        const error = 'userNameOrEmail error';
        (loginErrorSelector as jest.Mock).mockImplementation(() => ({
          userNameOrEmail: error,
          password: '',
        }));
        const {
          getByTestId,
          getByText,
        } = render(
          <Container
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(userNameOrEmail));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(userNameOrEmail), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetLogin);
      });
    });
    describe('password', () => {
      it('is empty', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('store login error is not an empty string', () => {
        const error = 'password error';
        (loginErrorSelector as jest.Mock).mockImplementation(() => ({
          userNameOrEmail: '',
          password: error,
        }));
        const {
          getByTestId,
          getByText,
        } = render(
          <Container
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(password));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetLogin);
      });
    });
  });
});
