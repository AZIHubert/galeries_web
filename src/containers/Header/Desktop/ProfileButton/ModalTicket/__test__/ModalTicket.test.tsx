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
  MAX_LENGTH_THRITY,
  MAX_LENGTH_TWO_HUNDRER,
  MIN_LENGTH_OF_FIVE,
  MIN_LENGTH_OF_TEN,
  REQUIRED,
} from '#helpers/formErrors';
import reducers from '#store/reducers';
import {
  loadingSelector,
  sendTicketErrorSelector,
  sendTicketStatusSelector,
} from '#store/selectors';

import ModalTicket from '../index';

const mockedStore = createStore(reducers);

const Container = ({
  handleClose,
}: {
  handleClose: () => void;
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ModalTicket
        handleClose={handleClose}
      />
    </ThemeProvider>
  </Provider>
);

const mockedDispatch = jest.fn();
const mockedFetchSendTicket = jest.fn();
const mockedResetSendTicket = jest.fn();
const mockedSetSendTicket = jest.fn();
const mockedHandleClose = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));
jest.mock('#store/actions/sendTicket.actions', () => ({
  fetchSendTicket: () => mockedFetchSendTicket,
  resetSendTicket: () => mockedResetSendTicket,
  setSendTicket: () => mockedSetSendTicket,
}));
jest.mock('#store/selectors/loading.selector', () => jest.fn());
jest.mock('#store/selectors/sendTicketError.selector', () => jest.fn());
jest.mock('#store/selectors/sendTicketStatus.selector', () => jest.fn());

const body = 'body';
const form = 'form';
const header = 'header';

describe('ModalTicket', () => {
  beforeEach(() => {
    (loadingSelector as jest.Mock).mockImplementation(() => false);
    (sendTicketErrorSelector as jest.Mock).mockImplementation(() => ({
      body: '',
      header: '',
    }));
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it('should reset sendTicket on unmount', () => {
    const { unmount } = render(
      <Container
        handleClose={mockedHandleClose}
      />,
    );
    unmount();
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedResetSendTicket);
  });
  it('should reset and fetch sendTicket on submit', async () => {
    const { getByTestId } = render(
      <Container
        handleClose={mockedHandleClose}
      />,
    );
    fireEvent.change(getByTestId(body), {
      target: {
        value: 'ticket body',
      },
    });
    fireEvent.change(getByTestId(header), {
      target: {
        value: 'ticket body',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedDispatch).toHaveBeenNthCalledWith(1, mockedResetSendTicket);
      expect(mockedDispatch).toHaveBeenNthCalledWith(2, mockedFetchSendTicket);
    });
  });
  it('should not dispatch if loading when submit', async () => {
    (loadingSelector as jest.Mock).mockImplementation(() => true);
    const { getByTestId } = render(
      <Container
        handleClose={mockedHandleClose}
      />,
    );
    fireEvent.change(getByTestId(body), {
      target: {
        value: 'ticket body',
      },
    });
    fireEvent.change(getByTestId(header), {
      target: {
        value: 'ticket body',
      },
    });
    fireEvent.submit(getByTestId(form));
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledTimes(0);
    });
  });
  it('should reset and close form if sendTicket.status === success', () => {
    (sendTicketStatusSelector as jest.Mock).mockImplementation(() => 'success');
    const { getByTestId } = render(
      <Container
        handleClose={mockedHandleClose}
      />,
    );
    fireEvent.change(getByTestId(body), {
      target: {
        value: 'ticket body',
      },
    });
    fireEvent.change(getByTestId(header), {
      target: {
        value: 'ticket header',
      },
    });
    expect(mockedHandleClose).toHaveBeenCalledTimes(1);
  });
  describe('should display error', () => {
    describe('if body', () => {
      it('is empty', async () => {
        const { getByTestId } = render(
          <Container
            handleClose={mockedHandleClose}
          />,
        );
        fireEvent.blur(getByTestId(body));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('is less than 10 characters', async () => {
        const { getByTestId } = render(
          <Container
            handleClose={mockedHandleClose}
          />,
        );
        fireEvent.change(getByTestId(body), {
          target: {
            value: 'a'.repeat(9),
          },
        });
        fireEvent.blur(getByTestId(body));
        const error = await screen.findByText(MIN_LENGTH_OF_TEN);
        expect(error).toBeTruthy();
      });
      it('is more than 200 characters', async () => {
        const { getByTestId } = render(
          <Container
            handleClose={mockedHandleClose}
          />,
        );
        fireEvent.change(getByTestId(body), {
          target: {
            value: 'a'.repeat(9),
          },
        });
        fireEvent.change(getByTestId(body), {
          target: {
            value: 'a'.repeat(300),
          },
        });
        fireEvent.blur(getByTestId(body));
        const error = await screen.findByText(MAX_LENGTH_TWO_HUNDRER);
        expect(error).toBeTruthy();
      });
      it('store sendTicket.errors.body is not an empty string', () => {
        const error = 'body error';
        (sendTicketErrorSelector as jest.Mock).mockImplementation(() => ({
          body: error,
          header: '',
        }));
        const {
          getByTestId,
          getByText,
        } = render(
          <Container
            handleClose={mockedHandleClose}
          />,
        );
        fireEvent.blur(getByTestId(body));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(body), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetSendTicket);
      });
    });
    describe('if header', () => {
      it('is empty', async () => {
        const { getByTestId } = render(
          <Container
            handleClose={mockedHandleClose}
          />,
        );
        fireEvent.blur(getByTestId(header));
        const error = await screen.findByText(REQUIRED);
        expect(error).toBeTruthy();
      });
      it('is less than 5 characters', async () => {
        const { getByTestId } = render(
          <Container
            handleClose={mockedHandleClose}
          />,
        );
        fireEvent.change(getByTestId(header), {
          target: {
            value: 'a'.repeat(4),
          },
        });
        fireEvent.blur(getByTestId(header));
        const error = await screen.findByText(MIN_LENGTH_OF_FIVE);
        expect(error).toBeTruthy();
      });
      it('is more than 30 characters', async () => {
        const { getByTestId } = render(
          <Container
            handleClose={mockedHandleClose}
          />,
        );
        fireEvent.change(getByTestId(header), {
          target: {
            value: 'a'.repeat(31),
          },
        });
        fireEvent.blur(getByTestId(header));
        const error = await screen.findByText(MAX_LENGTH_THRITY);
        expect(error).toBeTruthy();
      });
      it('store sendTicket.errors.body is not an empty string', () => {
        const error = 'header error';
        (sendTicketErrorSelector as jest.Mock).mockImplementation(() => ({
          body: '',
          header: error,
        }));
        const {
          getByTestId,
          getByText,
        } = render(
          <Container
            handleClose={mockedHandleClose}
          />,
        );
        fireEvent.blur(getByTestId(header));
        expect(getByText(error)).toBeTruthy();
        fireEvent.change(getByTestId(header), {
          target: {
            value: 'a',
          },
        });
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(mockedSetSendTicket);
      });
    });
  });
});
