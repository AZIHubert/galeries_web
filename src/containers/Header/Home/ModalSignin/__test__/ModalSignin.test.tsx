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
  CONFIRM_PASSWORD,
  EMAIL_FIELD,
  HAS_SPACES,
  MAX_LENGTH_THRITY,
  MIN_LENGTH_OF_HEIGH,
  MIN_LENGTH_OF_THREE,
  PASSWORD,
  REQUIRED,
} from '#helpers/formErrors';
import reducers from '#store/reducers';
import {
  loadingSelector,
  signinStatusSelector,
  signinErrorSelector,
} from '#store/selectors';
import ModalSignin from '../index';

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
      <ModalSignin
        setCurrentEmail={setCurrentEmail}
        setCurrentModal={setCurrentModal}
      />
    </ThemeProvider>
  </Provider>
);

const confirmPassword = 'confirmPassword';
const email = 'email';
const form = 'form';
const password = 'password';
const userName = 'userName';

const mockedDispatch = jest.fn();
const mockedSetCurrentEmail = jest.fn();
const mockedSetCurrentModal = jest.fn();
const mockedFetchSignin = jest.fn();
const mockedResetSignin = jest.fn();
const mockedSetSignin = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));
jest.mock('#store/actions/signin.actions', () => ({
  fetchSignin: () => mockedFetchSignin,
  resetSignin: () => mockedResetSignin,
  setSignin: () => mockedSetSignin,
}));
jest.mock('#store/selectors/loading.selector', () => jest.fn());
jest.mock('#store/selectors/signinStatus.selector', () => jest.fn());
jest.mock('#store/selectors/signinError.selector', () => jest.fn());

const script = document.createElement('script');
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

describe('ModalSignin', () => {
  beforeEach(() => {
    (signinStatusSelector as jest.Mock).mockImplementation(() => 'pending');
    (signinErrorSelector as jest.Mock).mockImplementation(() => ({
      confirmPassword: '',
      email: '',
      password: '',
      userName: '',
    }));
  });
  it('should reset Signin on unmount', () => {
    const { unmount } = render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    unmount();
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedResetSignin);
  });
  it('should reset and fetch signin on submit', async () => {
    const { getByTestId } = render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    fireEvent.change(getByTestId(userName), {
      target: {
        value: 'userName',
      },
    });
    fireEvent.change(getByTestId(email), {
      target: {
        value: 'user@email.com',
      },
    });
    fireEvent.change(getByTestId(password), {
      target: {
        value: 'Password0!',
      },
    });
    fireEvent.change(getByTestId(confirmPassword), {
      target: {
        value: 'Password0!',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, mockedResetSignin);
      expect(mockedDispatch).toHaveBeenNthCalledWith(2, mockedFetchSignin);
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
    fireEvent.change(getByTestId(userName), {
      target: {
        value: 'userName',
      },
    });
    fireEvent.change(getByTestId(email), {
      target: {
        value: 'user@email.com',
      },
    });
    fireEvent.change(getByTestId(password), {
      target: {
        value: 'Password0!',
      },
    });
    fireEvent.change(getByTestId(confirmPassword), {
      target: {
        value: 'Password0!',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(0);
    });
  });
  it('should trigger setCurrentModal and setCurrentModal if signin success', () => {
    (signinStatusSelector as jest.Mock).mockImplementation(() => 'success');
    render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    expect(mockedSetCurrentEmail).toHaveBeenCalledTimes(1);
    expect(mockedSetCurrentModal).toHaveBeenCalledTimes(1);
    expect(mockedSetCurrentModal).toHaveBeenCalledWith('confirmLanding');
  });
  it('should trigger sutCurrentModal when clicking on textButton', () => {
    const { getByText } = render(
      <Container
        setCurrentEmail={mockedSetCurrentEmail}
        setCurrentModal={mockedSetCurrentModal}
      />,
    );
    fireEvent.click(getByText('here'));
    expect(mockedSetCurrentModal).toHaveBeenCalledTimes(1);
    expect(mockedSetCurrentModal).toHaveBeenCalledWith('login');
  });
  describe('should display error if', () => {
    describe('userName', () => {
      it('is empty', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(userName));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('has spaces', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(userName), {
          target: {
            value: 'user name',
          },
        });
        fireEvent.blur(getByTestId(userName));
        const error = await screen.findByText(HAS_SPACES);
        expect(error).toBeTruthy();
      });
      it('has less than 3 characters', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(userName), {
          target: {
            value: 'a'.repeat(2),
          },
        });
        fireEvent.blur(getByTestId(userName));
        const error = await screen.findByText(MIN_LENGTH_OF_THREE);
        expect(error).toBeTruthy();
      });
      it('has more than 30 characters', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(userName), {
          target: {
            value: 'a'.repeat(31),
          },
        });
        fireEvent.blur(getByTestId(userName));
        const error = await screen.findByText(MAX_LENGTH_THRITY);
        expect(error).toBeTruthy();
      });
      it('store signin.userName is not an empty string', () => {
        const error = 'userName error';
        (signinErrorSelector as jest.Mock).mockImplementation(() => ({
          confirmPassword: '',
          email: '',
          password: '',
          userName: error,
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
        fireEvent.blur(getByTestId(userName));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(userName), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetSignin);
      });
    });
    describe('email', () => {
      it('is empty', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId('email'));
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
      it('store signin.email is not an empty string', () => {
        const error = 'email error';
        (signinErrorSelector as jest.Mock).mockImplementation(() => ({
          confirmPassword: '',
          email: error,
          password: '',
          userName: '',
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
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetSignin);
      });
    });
    describe('password', () => {
      it('is empty', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('has spaces', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
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
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
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
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'a'.repeat(31),
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(MAX_LENGTH_THRITY);
        expect(error).toBeTruthy();
      });
      it('doesn\'t have uppercase', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'password0!',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t have lowercase', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'PASSWORD0!',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t have number', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'Password!',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('doesn\'t have special character', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'Password0',
          },
        });
        fireEvent.blur(getByTestId(password));
        const error = await screen.findByText(PASSWORD);
        expect(error).toBeTruthy();
      });
      it('store signin.password is not an empty string', () => {
        const error = 'password error';
        (signinErrorSelector as jest.Mock).mockImplementation(() => ({
          confirmPassword: '',
          email: '',
          password: error,
          userName: '',
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
        fireEvent.blur(getByTestId(password));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(password), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetSignin);
      });
    });
    describe('confirm password', () => {
      it('is empty', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
        fireEvent.blur(getByTestId(confirmPassword));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('doesn\'t match password', async () => {
        const { getByTestId } = render(
          <Container
            setCurrentEmail={mockedSetCurrentEmail}
            setCurrentModal={mockedSetCurrentModal}
          />,
        );
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
      it('store signin.confirmPassword is not an empty string', () => {
        const error = 'confirmPassword error';
        (signinErrorSelector as jest.Mock).mockImplementation(() => ({
          confirmPassword: error,
          email: '',
          password: '',
          userName: '',
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
        fireEvent.blur(getByTestId(confirmPassword));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(confirmPassword), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetSignin);
      });
    });
  });
});
