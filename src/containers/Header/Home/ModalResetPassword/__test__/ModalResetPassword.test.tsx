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
  EMAIL_FIELD,
  REQUIRED,
} from '#helpers/formErrors';
import reducers from '#store/reducers';
import {
  loadingSelector,
  sendResetPasswordErrorSelector,
  sendResetPasswordStatusSelector,
} from '#store/selectors';

import ModalResetPassword from '../index';

const mockedStore = createStore(reducers);

const Container = ({
  setCurrentEmail,
  setCurrentModal,
}: {
  setCurrentEmail: () => void,
  setCurrentModal: () => void,
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ModalResetPassword
        setCurrentEmail={setCurrentEmail}
        setCurrentModal={setCurrentModal}
      />
    </ThemeProvider>
  </Provider>
);

const mockedDispatch = jest.fn();
const mockedSetCurrentEmail = jest.fn();
const mockedSetCurrentModal = jest.fn();
const mockedFetchSendResetPassword = jest.fn();
const mockedResetSendResetPassword = jest.fn();
const mockedSetSendResetPassword = jest.fn();

const email = 'email';
const form = 'form';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));
jest.mock('#store/actions/sendResetPassword.actions', () => ({
  fetchSendResetPassword: () => mockedFetchSendResetPassword,
  resetSendResetPassword: () => mockedResetSendResetPassword,
  setSendResetPassword: () => mockedSetSendResetPassword,
}));
jest.mock('#store/selectors/loading.selector', () => jest.fn());
jest.mock('#store/selectors/sendResetPasswordError.selector', () => jest.fn());
jest.mock('#store/selectors/sendResetPasswordStatus.selector', () => jest.fn());

describe('ModalResetPassword', () => {
  beforeEach(() => {
    (sendResetPasswordErrorSelector as jest.Mock).mockImplementation(() => ({
      email: '',
    }));
    (sendResetPasswordStatusSelector as jest.Mock).mockImplementation(() => 'pending');
  });
  it('should reset sendResetPassword on unmount', () => {
    const { unmount } = render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    unmount();
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedResetSendResetPassword);
  });
  it('should reset and fetch sendResetPassword on submit', async () => {
    const { getByTestId } = render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    fireEvent.change(getByTestId(email), {
      target: {
        value: 'user@email.com',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, mockedResetSendResetPassword);
      expect(mockedDispatch).toHaveBeenNthCalledWith(2, mockedFetchSendResetPassword);
    });
  });
  it('should not dispatch if loading', async () => {
    (loadingSelector as jest.Mock).mockImplementationOnce(() => ({
      loading: true,
    }));
    const { getByTestId } = render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
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
  it('should trigger setCurrentEmail and setCurrentModal if success', () => {
    (sendResetPasswordStatusSelector as jest.Mock).mockImplementation(() => 'success');
    render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    expect(mockedSetCurrentEmail).toHaveBeenCalledTimes(1);
    expect(mockedSetCurrentModal).toHaveBeenCalledTimes(1);
    expect(mockedSetCurrentModal).toHaveBeenCalledWith('resetPasswordLanding');
  });
  it('should trigger setCurrentModal if click on Cancel button', () => {
    const { getByText } = render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    fireEvent.click(getByText('Cancel'));
    expect(mockedSetCurrentModal).toHaveBeenCalledTimes(1);
    expect(mockedSetCurrentModal).toHaveBeenCalledWith('login');
  });
  it('should not dispatch setSendResetPassword if is has no error', () => {
    const {
      getByTestId,
    } = render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    fireEvent.change(getByTestId(email), {
      target: {
        value: 'a',
      },
    });
    fireEvent.blur(getByTestId(email));
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });
  describe('should display error if', () => {
    describe('email', () => {
      it('is empy', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(email));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('is not an email', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(email), {
          target: {
            value: 'not an email',
          },
        });
        fireEvent.blur(getByTestId(email));
        const error = await screen.findByText(EMAIL_FIELD);
        expect(error).toBeTruthy();
      });
      it('store sendResetPassword is not an empty string', () => {
        const error = 'email error';
        (sendResetPasswordErrorSelector as jest.Mock).mockImplementation(() => ({
          email: error,
        }));
        const {
          getByTestId,
          getByText,
        } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(email));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(email), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetSendResetPassword);
      });
    });
  });
});
