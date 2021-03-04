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
  handleClose,
  handleOpenTicket,
}: {
  handleClose: () => void;
  handleOpenTicket: () => void;
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <PopupProfile
        handleOpenTicket={handleOpenTicket}
        handleClose={handleClose}
      />
    </ThemeProvider>
  </Provider>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDOM,
  Link: jest.fn(({ children }) => children),
}));

const mockedHandleClose = jest.fn();
const mockedHandleOpenTicket = jest.fn();

describe('PopupProfile', () => {
  it('should trigger handleOpenTicket and handleClose when clicking on ticket button', () => {
    const { getByText } = render(
      <Container
        handleClose={mockedHandleClose}
        handleOpenTicket={mockedHandleOpenTicket}
      />,
    );
    fireEvent.click(getByText('Share your opinion? Find a bug?'));
    expect(mockedHandleOpenTicket).toHaveBeenCalledTimes(1);
    expect(mockedHandleClose).toHaveBeenCalledTimes(1);
  });
});
