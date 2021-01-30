import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import { REQUIRED } from '#helpers/formErrors';

import ModalSignin from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <ModalSignin
      loading={loading}
      setLoading={setLoading}
    />
  );
};

describe('ModalSignin', () => {
  const setLoading = jest.fn;
  let passwordField: HTMLElement;
  let submitButton: HTMLElement;
  let userNameOrEmaildField: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    passwordField = getByTestId('passwordField');
    submitButton = getByTestId('submitButton');
    userNameOrEmaildField = getByTestId('userNameOrEmailField');
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<ModalSignin loading={false} setLoading={setLoading} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not loading if errors', async () => {
    fireEvent.click(submitButton);
    const passwordError = await screen.findByTestId('passwordError');
    const userNameOrEmailError = await screen.findByTestId('userNameOrEmailError');
    expect(passwordError).toHaveTextContent(REQUIRED);
    expect(passwordField).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('signin');
    expect(submitButton).not.toBeDisabled();
    expect(userNameOrEmailError).toHaveTextContent(REQUIRED);
    expect(userNameOrEmailError).not.toBeDisabled();
  });
  it('should loading if no error', async () => {
    fireEvent.change(userNameOrEmaildField, { target: { value: 'user!' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    await screen.findAllByText('loading');
    expect(passwordField).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(userNameOrEmaildField).toBeDisabled();
  });
  describe('should return an error if', () => {
    describe('userNameOrEmail', () => {
      it('is empty', async () => {
        fireEvent.blur(userNameOrEmaildField);
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
