import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import {
  EMAIL_FIELD,
  REQUIRED,
} from '#helpers/formErrors';

import ModalForgotPassword from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  const setForgotPassword = () => {};
  const switchModal = () => {};
  const setCurrentEmail = () => {};
  return (
    <ModalForgotPassword
      setCurrentEmail={setCurrentEmail}
      setForgotPassword={setForgotPassword}
      setLoading={setLoading}
      switchModal={switchModal}
      loading={loading}
    />
  );
};

describe('ModalLogin', () => {
  const mockedSetForgotPassword = jest.fn;
  const mockedSetLoading = jest.fn;
  const mockedSetCurrentEmail = jest.fn;
  const mockedSwitchModal = jest.fn;
  let emailField: HTMLElement;
  let submitButton: HTMLElement;
  afterEach(cleanup);
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    emailField = getByTestId('emailField');
    submitButton = getByTestId('submitButton');
  });
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ModalForgotPassword
        setCurrentEmail={mockedSetCurrentEmail}
        setForgotPassword={mockedSetForgotPassword}
        setLoading={mockedSetLoading}
        switchModal={mockedSwitchModal}
        loading={false}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not loading if errors', async () => {
    fireEvent.click(submitButton);
    const emailError = await screen.findByTestId('emailError');
    expect(emailError).toHaveTextContent(REQUIRED);
    expect(emailField).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('reset');
    expect(submitButton).not.toBeDisabled();
  });
  it('should loading if no error', async () => {
    fireEvent.change(emailField, { target: { value: 'user@email.com' } });
    fireEvent.click(submitButton);
    await screen.findByText('loading');
    expect(emailField).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
  describe('should return an error if', () => {
    describe('email', () => {
      it('is empty', async () => {
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
  });
});
