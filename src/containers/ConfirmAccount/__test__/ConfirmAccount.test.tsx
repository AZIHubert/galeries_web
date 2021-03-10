import {
  act,
  cleanup,
  render,
} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';

import reducers from '#store/reducers';

import ConfirmAccount from '../index';

const mockedStore = createStore(reducers);
const token = 'token';

const mockDispatch = jest.fn();
const mockFetchConfirmation = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-redux', () => ({
  Provider: jest.fn(({ children }) => children),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: jest.fn(),
}));
jest.mock('#store/actions/confirmation.actions', () => ({
  fetchConfirmation: () => mockFetchConfirmation,
}));
jest.useFakeTimers();

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ConfirmAccount />
    </ThemeProvider>
  </Provider>
);

describe('ConfirmAccount', () => {
  afterEach(cleanup);
  (useParams as jest.Mock).mockImplementation(() => ({
    token,
  }));
  it('should render Loader Component on mount', () => {
    const { getByAltText } = render(<Container />);
    expect(getByAltText('Galeries logo')).toBeTruthy();
  });
  it('should fetch confirmation on mount', () => {
    render(<Container />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(mockFetchConfirmation);
  });
  it('should not redirect if less than 1.5s has passed', () => {
    render(<Container />);
    expect(mockHistoryPush).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
