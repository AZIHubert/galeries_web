import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import ReactRouterDOM from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';

import reducers from '#store/reducers';

import ProfileButton from '../index';

const mockedStore = createStore(reducers);

const modal = 'modal';
const popupProfile = 'popupProfile';

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

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ProfileButton
        modalTestId={modal}
        popupProfileTestId={popupProfile}
      />
    </ThemeProvider>
  </Provider>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDOM,
  Link: jest.fn(({ children }) => children),
}));
jest.mock('#components/Image', () => ({
  __esModule: true,
  A: true,
  default: () => <div></div>,
}));

describe('ProfileButton', () => {
  afterEach(cleanup);
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  it('should have PopupProfile close on mount', () => {
    const { queryByTestId } = render(<Container />);
    expect(queryByTestId(popupProfile)).toBeFalsy();
  });
  it('should open PopupProfile open when clicking button', () => {
    const {
      getByText,
      getByTestId,
    } = render(<Container />);
    fireEvent.click(getByText('user name'));
    expect(getByTestId(popupProfile)).toBeTruthy();
  });
  it('should close PopupProfile when clicking outside', () => {
    const {
      getByText,
    } = render(<Container />);
    fireEvent.click(getByText('user name'));
    fireEvent.click(document);
    expect(screen.queryByTestId(popupProfile)).toBeFalsy();
  });
});
