import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

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

import PopupLogin from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <PopupLogin
      loading={loading}
      setLoading={setLoading}
    />
  );
};

describe('PopupSignin', () => {
  const setLoading = jest.fn;
  let confirmPasswordField: HTMLElement;
  let emailField: HTMLElement;
  let submitButton: HTMLElement;
  let passwordField: HTMLElement;
  let userNameField: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    confirmPasswordField = getByTestId('confirmPasswordField');
    emailField = getByTestId('emailField');
    passwordField = getByTestId('passwordField');
    submitButton = getByTestId('submitButton');
    userNameField = getByTestId('userNameField');
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<PopupLogin loading={false} setLoading={setLoading} />).toJSON();
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
    expect(submitButton).toHaveTextContent('signin');
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
