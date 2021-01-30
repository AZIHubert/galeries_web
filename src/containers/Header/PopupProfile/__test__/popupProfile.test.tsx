import * as React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import PopupProfile from '../index';

describe('PopupProfile', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<PopupProfile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not display ticket modal on mount', () => {
    const { queryByTestId } = render(<PopupProfile />);
    const ticketModal = queryByTestId('ticketModal');
    expect(ticketModal).toBeNull();
  });
  it('open the ticket modal', () => {
    const { getByTestId } = render(<PopupProfile />);
    const buttonTicketModal = getByTestId('buttonTicketModal');
    fireEvent.click(buttonTicketModal);
    const ticketModal = screen.queryByTestId('ticketModal');
    expect(ticketModal).not.toBeNull();
  });
  it('should close the ticket modal', () => {
    const { getByTestId } = render(<PopupProfile />);
    const buttonTicketModal = getByTestId('buttonTicketModal');
    fireEvent.click(buttonTicketModal);
    fireEvent.click(buttonTicketModal);
    const ticketModal = screen.queryByTestId('ticketModal');
    expect(ticketModal).toBeNull();
  });
});
