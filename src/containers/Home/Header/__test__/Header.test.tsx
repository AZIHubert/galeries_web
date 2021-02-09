import {
  fireEvent,
  render,
  screen,
  act,
} from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import ThemeProvider from '#contexts/ThemeContext';

import Header from '../index';

describe('Header', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  beforeEach(() => {
    act(() => {
      render(
        <ThemeProvider>
          <Header />
        </ThemeProvider>,
      );
    });
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render verify account modal if account is created', async () => {
    const email = 'user@email.com';
    const openSignin = screen.getByTestId('openSignin');
    fireEvent.click(openSignin);
    const confirmPasswordField = screen.getByTestId('confirmPasswordField');
    const emailField = screen.getByTestId('emailField');
    const passwordField = screen.getByTestId('passwordField');
    const submitButton = screen.getByTestId('submitButton');
    const userNameField = screen.getByTestId('userNameField');
    fireEvent.change(confirmPasswordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(emailField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(userNameField, { target: { value: 'user' } });
    fireEvent.click(submitButton);
    await screen.findByTestId('modalVerifyAccount');
    const modalSignin = screen.queryByTestId('modalSignin');
    expect(modalSignin).toBeNull();
    const verifyAccountBody = screen.getByTestId('verifyAccountBody');
    expect(verifyAccountBody).toHaveTextContent(email);
  });
  it('should switch betwen login and forgotPassword modal', () => {
    const openLogin = screen.getByTestId('openLogin');
    fireEvent.click(openLogin);
    const forgotPasswordButton = screen.getByTestId('forgotPasswordButton');
    fireEvent.click(forgotPasswordButton);
    const modalForgotPassword = screen.queryByTestId('modalForgotPassword');
    expect(modalForgotPassword).not.toBeNull();
    const cancelButton = screen.getByTestId('cancelButton');
    fireEvent.click(cancelButton);
    const loginModal = screen.queryByTestId('loginModal');
    expect(loginModal).not.toBeNull();
  });
  it('should switch between login and signin modal', () => {
    const openLogin = screen.getByTestId('openLogin');
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
  it('should switch to ModalValidateResetPassword if ValidateResetPassword form is valid', async () => {
    const email = 'user@email.com';
    const openLogin = screen.getByTestId('openLogin');
    fireEvent.click(openLogin);
    const forgotPasswordButton = screen.getByTestId('forgotPasswordButton');
    fireEvent.click(forgotPasswordButton);
    const emailField = screen.getByTestId('emailField');
    const submitButton = screen.getByTestId('submitButton');
    fireEvent.change(emailField, { target: { value: email } });
    fireEvent.click(submitButton);
    await screen.findByTestId('modalValidateResetPassword');
    const modalForgotPassword = screen.queryByTestId('modalForgotPassword');
    expect(modalForgotPassword).toBeNull();
    const validateResetPasswordBody = screen.getByTestId('validateResetPasswordBody');
    expect(validateResetPasswordBody).toHaveTextContent(email);
  });
});
