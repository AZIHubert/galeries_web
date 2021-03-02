import {
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';
import reactRedux, { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import reducers from '#store/reducers';
import {
  loadingSelector,
} from '#store/selectors';

import ModalResetPasswordLanding from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ModalResetPasswordLanding
        currentEmail='currenEmail'
      />
    </ThemeProvider>
  </Provider>
);

const mockedDispatch = jest.fn();
const mockedFetchSendResetPassword = jest.fn();
const mockedResetSendResetPassword = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));
jest.mock('#store/actions/sendResetPassword.actions', () => ({
  fetchSendResetPassword: () => mockedFetchSendResetPassword,
  resetSendResetPassword: () => mockedResetSendResetPassword,
}));
jest.mock('#store/selectors/loading.selector', () => jest.fn());

describe('ModalResetPasswordLanding', () => {
  it('should reset sendResetPassword on unmount', () => {
    const { unmount } = render(<Container />);
    unmount();
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedResetSendResetPassword);
  });
  it('should reset fetch sendResetPassword on click', () => {
    const { getByText } = render(<Container />);
    fireEvent.click(getByText('resend it'));
    expect(mockedDispatch).toHaveBeenCalledTimes(2);
    expect(mockedDispatch).toHaveBeenNthCalledWith(1, mockedResetSendResetPassword);
    expect(mockedDispatch).toHaveBeenNthCalledWith(2, mockedFetchSendResetPassword);
  });
  it('should not dispatch if loading is true', () => {
    (loadingSelector as jest.Mock).mockImplementation(() => true);
    const { getByText } = render(<Container />);
    fireEvent.click(getByText('resend it'));
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });
});
