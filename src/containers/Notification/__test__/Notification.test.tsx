import { render } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import reactRedux, { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import theme from '#helpers/theme';
import reducers from '#store/reducers';
import {
  notificationSelector,
} from '#store/selectors';

import Notification from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <Notification />
    </ThemeProvider>
  </Provider>
);

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux') as typeof reactRedux,
  useDispatch: () => mockedDispatch,
}));
jest.mock('#store/selectors/notification.selector', () => jest.fn());

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn((props) => (
    props.in ? (
      <FakeTransition>
        {props.children}
      </FakeTransition>
    ) : null));
  return {
    CSSTransition: FakeCSSTransition,
    Transition: FakeTransition,
  };
});

describe('Notification', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  it('should render modal if notification.text is not an empty string', () => {
    (notificationSelector as jest.Mock).mockImplementation(() => ({
      error: false,
      text: 'text',
    }));
    const { getByText } = render(<Container />);
    expect(getByText('text')).toBeTruthy();
  });
  it('should not render modal if notification.text is an empty string', () => {
    (notificationSelector as jest.Mock).mockImplementation(() => ({
      error: true,
      text: '',
    }));
    const { queryByTestId } = render(<Container />);
    expect(queryByTestId('modal')).toBeFalsy();
  });
  it('should render primary style if notification.error === false', () => {
    (notificationSelector as jest.Mock).mockImplementation(() => ({
      error: false,
      text: 'text',
    }));
    const { getByText } = render(<Container />);
    expect(getByText('text')).toHaveStyle(`background-color: ${theme.colors.primary}`);
    expect(getByText('text')).toHaveStyle(`color: ${theme.colors.secondary}`);
  });
  it('should render danger style if notification.error === true', () => {
    (notificationSelector as jest.Mock).mockImplementation(() => ({
      error: true,
      text: 'text',
    }));
    const { getByText } = render(<Container />);
    expect(getByText('text')).toHaveStyle(`background-color: ${theme.colors.danger}`);
    expect(getByText('text')).toHaveStyle(`color: ${theme.colors.white}`);
  });
});
