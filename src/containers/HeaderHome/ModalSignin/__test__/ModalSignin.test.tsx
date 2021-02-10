import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import ThemeProvider from '#contexts/ThemeContext';

import {
  CONFIRM_PASSWORD,
  EMAIL_FIELD,
  HAS_SPACES,
  MAX_LENGTH_THRITY,
  MIN_LENGTH_OF_HEIGH,
  MIN_LENGTH_OF_THREE,
  PASSWORD,
  REQUIRED,
} from '#helpers/formErrors';

import ModalSignin from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [accountCreate, setAccountCreate] = React.useState<boolean>(false);
  const switchModal = () => {};
  const setCurrentEmail = () => {};
  return (
    <ThemeProvider>
      <ModalSignin
        loading={loading}
        setLoading={setLoading}
        setAccountCreate={setAccountCreate}
        switchModal={switchModal}
        setCurrentEmail={setCurrentEmail}
      />
      {accountCreate
        ? (
          <p
            data-testid='accountCreate'
          >
            accountCreate
          </p>
        )
        : null}
    </ThemeProvider>
  );
};

describe('ModalSignin', () => {
  const mockedSetLoading = jest.fn;
  const mockedSetAccountCreate = jest.fn;
  const mockedSwitchModal = jest.fn;
  const mockedSetCurrentEmail = jest.fn;
  let confirmPasswordField: HTMLElement;
  let emailField: HTMLElement;
  let submitButton: HTMLElement;
  let passwordField: HTMLElement;
  let userNameField: HTMLElement;
  beforeEach(() => {
    act(() => {
      render(<Container />);
    });
    confirmPasswordField = screen.getByTestId('confirmPasswordField');
    emailField = screen.getByTestId('emailField');
    passwordField = screen.getByTestId('passwordField');
    submitButton = screen.getByTestId('submitButton');
    userNameField = screen.getByTestId('userNameField');
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ModalSignin
          loading={false}
          setLoading={mockedSetLoading}
          setAccountCreate={mockedSetAccountCreate}
          switchModal={mockedSwitchModal}
          setCurrentEmail={mockedSetCurrentEmail}
        />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not loading if errors', async () => {
    fireEvent.click(submitButton);
    const confirmPasswordError = await screen.findByTestId('confirmPasswordError');
    const emailError = await screen.findByTestId('emailError');
    const passwordError = await screen.findByTestId('passwordError');
    const userNameError = await screen.findByTestId('userNameError');
    expect(confirmPasswordError).toHaveTextContent(REQUIRED);
    expect(confirmPasswordField).not.toBeDisabled();
    expect(emailError).toHaveTextContent(REQUIRED);
    expect(emailField).not.toBeDisabled();
    expect(passwordError).toHaveTextContent(REQUIRED);
    expect(passwordField).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('Sign in');
    expect(submitButton).not.toBeDisabled();
    expect(userNameError).toHaveTextContent(REQUIRED);
    expect(userNameField).not.toBeDisabled();
  });
  it('should loading if no error', async () => {
    fireEvent.change(confirmPasswordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(emailField, { target: { value: 'user@email.com' } });
    fireEvent.change(passwordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(userNameField, { target: { value: 'user' } });
    fireEvent.click(submitButton);
    await screen.findAllByText('loading');
    expect(confirmPasswordField).toBeDisabled();
    expect(emailField).toBeDisabled();
    expect(passwordField).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(userNameField).toBeDisabled();
  });
  it('should set accountCreated to true if no error', async () => {
    fireEvent.change(confirmPasswordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(emailField, { target: { value: 'user@email.com' } });
    fireEvent.change(passwordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(userNameField, { target: { value: 'user' } });
    fireEvent.click(submitButton);
    const accountCreate = await screen.findByTestId('accountCreate');
    expect(accountCreate).toHaveTextContent('accountCreate');
  });
  describe('should show an error if', () => {
    describe('userName field', () => {
      it('is empty', async () => {
        fireEvent.blur(userNameField);
        const userNameError = await screen.findByTestId('userNameError');
        expect(userNameError).not.toBeNull();
        expect(userNameError).toHaveTextContent(REQUIRED);
      });
      it('contain spaces', async () => {
        fireEvent.change(userNameField, { target: { value: 'a a' } });
        fireEvent.blur(userNameField);
        const userNameError = await screen.findByTestId('userNameError');
        expect(userNameError).not.toBeNull();
        expect(userNameError).toHaveTextContent(HAS_SPACES);
      });
      it('is less than three char', async () => {
        fireEvent.change(userNameField, { target: { value: 'aa' } });
        fireEvent.blur(userNameField);
        const userNameError = await screen.findByTestId('userNameError');
        expect(userNameError).not.toBeNull();
        expect(userNameError).toHaveTextContent(MIN_LENGTH_OF_THREE);
      });
      it('is more than thirty char', async () => {
        fireEvent.change(userNameField, { target: { value: 'a'.repeat(31) } });
        fireEvent.blur(userNameField);
        const userNameError = await screen.findByTestId('userNameError');
        expect(userNameError).not.toBeNull();
        expect(userNameError).toHaveTextContent(MAX_LENGTH_THRITY);
      });
    });
    describe('email field', () => {
      it('is empy', async () => {
        fireEvent.blur(emailField);
        const emailError = await screen.findByTestId('emailError');
        expect(emailError).not.toBeNull();
        expect(emailError).toHaveTextContent(REQUIRED);
      });
      it('is not an email', async () => {
        fireEvent.change(emailField, { target: { value: 'notAnEmail' } });
        fireEvent.blur(emailField);
        const emailError = await screen.findByTestId('emailError');
        expect(emailError).not.toBeNull();
        expect(emailError).toHaveTextContent(EMAIL_FIELD);
      });
    });
    describe('password field', () => {
      it('is empty', async () => {
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(REQUIRED);
      });
      it('contain spaces', async () => {
        fireEvent.change(passwordField, { target: { value: 'a a' } });
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(HAS_SPACES);
      });
      it('contain less than 8 chars', async () => {
        fireEvent.change(passwordField, { target: { value: 'a'.repeat(7) } });
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(MIN_LENGTH_OF_HEIGH);
      });
      it('contain more than 30 chars', async () => {
        fireEvent.change(passwordField, { target: { value: 'a'.repeat(31) } });
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(MAX_LENGTH_THRITY);
      });
      it('doesn\'t contain any uppercase', async () => {
        fireEvent.change(passwordField, { target: { value: 'aaoudjiuvhds9!' } });
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(PASSWORD);
      });
      it('doesn\'t contain any lowercase', async () => {
        fireEvent.change(passwordField, { target: { value: 'AAOUDJIUVHDS9!' } });
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(PASSWORD);
      });
      it('doesn\'t contain any number', async () => {
        fireEvent.change(passwordField, { target: { value: 'Aaoudjiuvhds!' } });
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(PASSWORD);
      });
      it('doesn\'t contain any special char', async () => {
        fireEvent.change(passwordField, { target: { value: 'Aaoudjiuvhds9' } });
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(PASSWORD);
      });
    });
    describe('confirm password', () => {
      it('and password not match', async () => {
        fireEvent.change(passwordField, { target: { value: 'Aaoudjiuvhds9!' } });
        fireEvent.change(confirmPasswordField, { target: { value: 'wrongPassword' } });
        fireEvent.blur(confirmPasswordField);
        const confirmPasswordError = await screen.findByTestId('confirmPasswordError');
        expect(confirmPasswordError).not.toBeNull();
        expect(confirmPasswordError).toHaveTextContent(CONFIRM_PASSWORD);
      });
    });
  });
});
