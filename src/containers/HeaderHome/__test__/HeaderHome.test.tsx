import {
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import reducers from '#store/reducers';

import HeaderHome from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <HeaderHome />
    </ThemeProvider>
  </Provider>
);

const script = document.createElement('script');
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

describe('HeaderHome', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  it('should open Login', () => {
    const {
      getByTestId,
      getByText,
    } = render(<Container />);
    fireEvent.click(getByText('Log in'));
    expect(getByTestId('login')).toBeTruthy();
  });
  it('should open signin', () => {
    const {
      getByTestId,
      getByText,
    } = render(<Container />);
    fireEvent.click(getByText('Sign in'));
    expect(getByTestId('signin')).toBeTruthy();
  });
});
