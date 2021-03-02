import {
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
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
