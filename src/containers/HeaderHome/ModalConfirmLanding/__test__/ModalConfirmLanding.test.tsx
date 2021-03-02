import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import reducers from '#store/reducers';

import ModalConfirmLanding from '../index';

const mockedStore = (initialState?: any) => createStore(reducers, initialState);

const Container = ({
  currentEmail = 'currentEmail',
  initialState,
}: {
  currentEmail?: string;
  initialState?: any;
}) => (
  <Provider store={mockedStore(initialState)}>
    <ThemeProvider>
      <ModalConfirmLanding
        currentEmail={currentEmail}
      />
    </ThemeProvider>
  </Provider>
);

const mockDispatch = jest.fn();
const mockFetchSendConfirmation = jest.fn();
const mockResetSendConfirmation = jest.fn();

jest.mock('react-redux', () => ({
  Provider: jest.fn(({ children }) => children),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
jest.mock('#store/actions/sendConfirmation.actions', () => ({
  fetchSendConfirmation: () => mockFetchSendConfirmation,
  resetSendConfirmation: () => mockResetSendConfirmation,
}));

describe('ModalConfirmLanding', () => {
  afterEach(cleanup);
  it('should triger setSendConfirmation on mount', () => {
    const { unmount } = render(<Container />);
    unmount();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(mockResetSendConfirmation);
  });
  it('should triger fetchSendConfirmation on click', () => {
    const { getByText } = render(<Container />);
    fireEvent.click(getByText('resend it'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(mockFetchSendConfirmation);
  });
});
