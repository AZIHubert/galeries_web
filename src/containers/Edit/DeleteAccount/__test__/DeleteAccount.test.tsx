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

import DeleteAccount from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <DeleteAccount />
    </ThemeProvider>
  </Provider>
);

describe('DeleteAccount', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  it('should open modal', () => {
    const { getByTestId, getByRole } = render(<Container />);
    fireEvent.click(getByRole('button'));
    expect(getByTestId('modal')).toBeTruthy();
  });
});
