import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import {
  REQUIRED,
} from '#helpers/formErrors';

import ChangeEmail from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <ChangeEmail
      loading={loading}
      setLoading={setLoading}
    />
  );
};

describe('ChangeEmail', () => {
  const setLoading = jest.fn;
  let passwordField: HTMLElement;
  let submitButton: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    passwordField = getByTestId('passwordField');
    submitButton = getByTestId('submitButton');
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ChangeEmail
        loading={false}
        setLoading={setLoading}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not loading if errors', async () => {
    fireEvent.click(submitButton);
    const passwordError = await screen.findByTestId('passwordError');
    expect(passwordField).not.toBeDisabled();
    expect(passwordError).toHaveTextContent(REQUIRED);
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('change your email');
  });
  it('should loading if no error', async () => {
    fireEvent.change(passwordField, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    await screen.findByText('loading');
    expect(passwordField).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
  describe('should return an error if', () => {
    describe('password', () => {
      it('is empty', async () => {
        fireEvent.blur(passwordField);
        const passwordError = await screen.findByTestId('passwordError');
        expect(passwordError).not.toBeNull();
        expect(passwordError).toHaveTextContent(REQUIRED);
      });
    });
  });
});
