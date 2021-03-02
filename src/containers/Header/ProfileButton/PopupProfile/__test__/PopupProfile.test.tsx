import {
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import ReactRouterDOM from 'react-router-dom';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import reducers from '#store/reducers';

import PopupProfile from '../index';

const mockedStore = createStore(reducers);

const Container = ({
  handleOpenTicket,
}: {
  handleOpenTicket: () => void
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <PopupProfile
        handleOpenTicket={handleOpenTicket}
      />
    </ThemeProvider>
  </Provider>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDOM,
  Link: jest.fn(({ children }) => children),
}));

const mockedHandleOpenTicket = jest.fn();

describe('PopupProfile', () => {
  it('should trigger handleOpenTicket', () => {
    const { getByText } = render(
      <Container
        handleOpenTicket={mockedHandleOpenTicket}
      />,
    );
    fireEvent.click(getByText('Share your opinion? Find a bug?'));
    expect(mockedHandleOpenTicket).toHaveBeenCalledTimes(1);
  });
});
