import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import { REQUIRED } from '#helpers/formErrors';

import ModalLogin from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  const setForgotPassword = () => {};
  const switchModal = () => {};
  return (
    <ModalLogin
      loading={loading}
      setLoading={setLoading}
      switchModal={switchModal}
      setForgotPassword={setForgotPassword}
    />
  );
};

describe('ModalLogin', () => {
  const mockedSetLoading = jest.fn;
  const mockedSwitchModal = jest.fn;
  const mockedSetForgotPassword = jest.fn;
  let passwordField: HTMLElement;
  let submitButton: HTMLElement;
  let userNameOrEmailField: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    passwordField = getByTestId('passwordField');
    submitButton = getByTestId('submitButton');
    userNameOrEmailField = getByTestId('userNameOrEmailField');
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ModalLogin
        loading={false}
        setForgotPassword={mockedSetForgotPassword}
        setLoading={mockedSetLoading}
        switchModal={mockedSwitchModal}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not loading if errors', async () => {
    fireEvent.click(submitButton);
    const passwordError = await screen.findByTestId('passwordError');
    const userNameOrEmailError = await screen.findByTestId('userNameOrEmailError');
    expect(passwordError).toHaveTextContent(REQUIRED);
    expect(passwordField).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('login');
    expect(submitButton).not.toBeDisabled();
    expect(userNameOrEmailError).toHaveTextContent(REQUIRED);
    expect(userNameOrEmailField).not.toBeDisabled();
  });
  it('should loading if no error', async () => {
    fireEvent.change(userNameOrEmailField, { target: { value: 'user!' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    await screen.findByText('loading');
    expect(passwordField).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(userNameOrEmailField).toBeDisabled();
  });
  describe('should return an error if', () => {
    describe('userNameOrEmail', () => {
      it('is empty', async () => {
        fireEvent.blur(userNameOrEmailField);
        const userNameError = await screen.findByTestId('userNameOrEmailError');
        expect(userNameError).not.toBeNull();
        expect(userNameError).toHaveTextContent(REQUIRED);
      });
    });
    describe('password', () => {
      it('is empty', async () => {
        fireEvent.blur(passwordField);
        const userNameError = await screen.findByTestId('passwordError');
        expect(userNameError).not.toBeNull();
        expect(userNameError).toHaveTextContent(REQUIRED);
      });
    });
  });
});
