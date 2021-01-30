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
  HAS_SPACES,
  MAX_LENGTH_THRITY,
  MIN_LENGTH_OF_HEIGH,
  PASSWORD,
  REQUIRED,
} from '#helpers/formErrors';

import ChangePassword from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <ChangePassword
      loading={loading}
      setLoading={setLoading}
    />
  );
};

describe('ChangePassword', () => {
  const setLoading = jest.fn;
  let confirmNewPasswordField: HTMLElement;
  let currentPasswordField: HTMLElement;
  let newPasswordField: HTMLElement;
  let submitButton: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    confirmNewPasswordField = getByTestId('confirmNewPasswordField');
    currentPasswordField = getByTestId('currentPasswordField');
    newPasswordField = getByTestId('newPasswordField');
    submitButton = getByTestId('submitButton');
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ChangePassword
        loading={false}
        setLoading={setLoading}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not loading if errors', async () => {
    fireEvent.click(submitButton);
    const confirmNewPasswordError = await screen.findByTestId('confirmNewPasswordError');
    const currentPasswordError = await screen.findByTestId('currentPasswordError');
    const newPasswordError = await screen.findByTestId('newPasswordError');
    expect(confirmNewPasswordField).not.toBeDisabled();
    expect(confirmNewPasswordError).toHaveTextContent(REQUIRED);
    expect(currentPasswordField).not.toBeDisabled();
    expect(currentPasswordError).toHaveTextContent(REQUIRED);
    expect(newPasswordField).not.toBeDisabled();
    expect(newPasswordError).toHaveTextContent(REQUIRED);
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('change your password');
  });
  it('should loading if no error', async () => {
    fireEvent.change(confirmNewPasswordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.change(currentPasswordField, { target: { value: 'password' } });
    fireEvent.change(newPasswordField, { target: { value: 'Aaoudjiuvhds9!' } });
    fireEvent.click(submitButton);
    await screen.findByText('loading');
    expect(confirmNewPasswordField).toBeDisabled();
    expect(currentPasswordField).toBeDisabled();
    expect(newPasswordField).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
  describe('should return an error if', () => {
    describe('confirmNewPasswordField', () => {
      it('and password not match', async () => {
        fireEvent.change(newPasswordField, { target: { value: 'Aaoudjiuvhds9!' } });
        fireEvent.change(confirmNewPasswordField, { target: { value: 'wrongPassword' } });
        fireEvent.blur(confirmNewPasswordField);
        const confirmNewPasswordError = await screen.findByTestId('confirmNewPasswordError');
        expect(confirmNewPasswordError).not.toBeNull();
        expect(confirmNewPasswordError).toHaveTextContent(CONFIRM_PASSWORD);
      });
    });
    describe('currentPasswordField', () => {
      it('is empty', async () => {
        fireEvent.blur(currentPasswordField);
        const currentPasswordError = await screen.findByTestId('currentPasswordError');
        expect(currentPasswordError).not.toBeNull();
        expect(currentPasswordError).toHaveTextContent(REQUIRED);
      });
    });
    describe('newPasswordField', () => {
      it('is empty', async () => {
        fireEvent.blur(newPasswordField);
        const newPasswordError = await screen.findByTestId('newPasswordError');
        expect(newPasswordError).not.toBeNull();
        expect(newPasswordError).toHaveTextContent(REQUIRED);
      });
      it('contain spaces', async () => {
        fireEvent.change(newPasswordField, { target: { value: 'a a' } });
        fireEvent.blur(newPasswordField);
        const newPasswordError = await screen.findByTestId('newPasswordError');
        expect(newPasswordError).not.toBeNull();
        expect(newPasswordError).toHaveTextContent(HAS_SPACES);
      });
      it('contain less than 8 chars', async () => {
        fireEvent.change(newPasswordField, { target: { value: 'a'.repeat(7) } });
        fireEvent.blur(newPasswordField);
        const newPasswordError = await screen.findByTestId('newPasswordError');
        expect(newPasswordError).not.toBeNull();
        expect(newPasswordError).toHaveTextContent(MIN_LENGTH_OF_HEIGH);
      });
      it('contain more than 30 chars', async () => {
        fireEvent.change(newPasswordField, { target: { value: 'a'.repeat(31) } });
        fireEvent.blur(newPasswordField);
        const newPasswordError = await screen.findByTestId('newPasswordError');
        expect(newPasswordError).not.toBeNull();
        expect(newPasswordError).toHaveTextContent(MAX_LENGTH_THRITY);
      });
      it('doesn\'t contain any uppercase', async () => {
        fireEvent.change(newPasswordField, { target: { value: 'aaoudjiuvhds9!' } });
        fireEvent.blur(newPasswordField);
        const newPasswordError = await screen.findByTestId('newPasswordError');
        expect(newPasswordError).not.toBeNull();
        expect(newPasswordError).toHaveTextContent(PASSWORD);
      });
      it('doesn\'t contain any lowercase', async () => {
        fireEvent.change(newPasswordField, { target: { value: 'AAOUDJIUVHDS9!' } });
        fireEvent.blur(newPasswordField);
        const newPasswordError = await screen.findByTestId('newPasswordError');
        expect(newPasswordError).not.toBeNull();
        expect(newPasswordError).toHaveTextContent(PASSWORD);
      });
      it('doesn\'t contain any number', async () => {
        fireEvent.change(newPasswordField, { target: { value: 'Aaoudjiuvhds!' } });
        fireEvent.blur(newPasswordField);
        const newPasswordError = await screen.findByTestId('newPasswordError');
        expect(newPasswordError).not.toBeNull();
        expect(newPasswordError).toHaveTextContent(PASSWORD);
      });
      it('doesn\'t contain any special char', async () => {
        fireEvent.change(newPasswordField, { target: { value: 'Aaoudjiuvhds9' } });
        fireEvent.blur(newPasswordField);
        const newPasswordError = await screen.findByTestId('newPasswordError');
        expect(newPasswordError).not.toBeNull();
        expect(newPasswordError).toHaveTextContent(PASSWORD);
      });
    });
  });
});
