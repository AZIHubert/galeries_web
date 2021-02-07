import {
  fireEvent,
  render,
  screen,
  act,
} from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Header from '../index';

describe('Header', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  it('renders without crashing', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render verify account modal if account is created', async () => {
    act(() => {
      render(<Header />);
    });
    const openSignin = screen.getByTestId('openSignin');
    fireEvent.click(openSignin);
    const confirmPasswordField = screen.getByTestId('confirmPasswordField');
    const emailField = screen.getByTestId('emailField');
    const passwordField = screen.getByTestId('passwordField');
    const submitButton = screen.getByTestId('submitButton');
    const userNameField = screen.getByTestId('userNameField');
    fireEvent.change(confirmPasswordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(emailField, { target: { value: 'user@email.com' } });
    fireEvent.change(passwordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(userNameField, { target: { value: 'user' } });
    fireEvent.click(submitButton);
    await screen.findByTestId('modalVerifyAccount');
    const modalSignin = screen.queryByTestId('modalSignin');
    expect(modalSignin).toBeNull();
  });
  it('should switch between login and signin modal', () => {
    const { getByTestId } = render(<Header />);
    const openLogin = getByTestId('openLogin');
    fireEvent.click(openLogin);
    const switchToSignin = screen.getByTestId('switchToSignin');
    fireEvent.click(switchToSignin);
    const modalSignin = screen.queryByTestId('modalSignin');
    expect(modalSignin).not.toBeNull();
    const switchToLogin = screen.getByTestId('switchToLogin');
    fireEvent.click(switchToLogin);
    const loginModal = screen.queryByTestId('loginModal');
    expect(loginModal).not.toBeNull();
  });
});
