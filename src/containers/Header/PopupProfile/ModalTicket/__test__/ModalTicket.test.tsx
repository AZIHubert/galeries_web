import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import {
  MAX_LENGTH_THRITY,
  MAX_LENGTH_TWO_HUNDRER,
  MIN_LENGTH_OF_FIVE,
  MIN_LENGTH_OF_TEN,
  REQUIRED,
} from '#helpers/formErrors';

import ModalTicket from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <ModalTicket
      loading={loading}
      setLoading={setLoading}
    />
  );
};

describe('ModalSignin', () => {
  const setLoading = jest.fn;
  let bodyField: HTMLElement;
  let headerField: HTMLElement;
  let submitButton: HTMLElement;
  beforeEach(() => {
    const { getByTestId } = render(<Container />);
    bodyField = getByTestId('bodyField');
    headerField = getByTestId('headerField');
    submitButton = getByTestId('submitButton');
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<ModalTicket loading={false} setLoading={setLoading} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not loading if errors', async () => {
    fireEvent.click(submitButton);
    const headerError = await screen.findByTestId('headerError');
    const bodyError = await screen.findByTestId('bodyError');
    expect(headerField).not.toBeDisabled();
    expect(headerError).toHaveTextContent(REQUIRED);
    expect(submitButton).toHaveTextContent('send');
    expect(submitButton).not.toBeDisabled();
    expect(headerField).not.toBeDisabled();
    expect(bodyError).toHaveTextContent(REQUIRED);
  });
  it('should loading if no error', async () => {
    fireEvent.change(headerField, { target: { value: 'a'.repeat(5) } });
    fireEvent.change(bodyField, { target: { value: 'a'.repeat(10) } });
    fireEvent.click(submitButton);
    await screen.findByText('loading');
    expect(bodyField).toBeDisabled();
    expect(headerField).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
  describe('should return an error if', () => {
    describe('header', () => {
      it('is empty', async () => {
        fireEvent.blur(headerField);
        const headerError = await screen.findByTestId('headerError');
        expect(headerError).not.toBeNull();
        expect(headerError).toHaveTextContent(REQUIRED);
      });
      it('is less than 5 characters', async () => {
        fireEvent.change(headerField, { target: { value: 'a'.repeat(4) } });
        fireEvent.blur(headerField);
        const headerError = await screen.findByTestId('headerError');
        expect(headerError).not.toBeNull();
        expect(headerError).toHaveTextContent(MIN_LENGTH_OF_FIVE);
      });
      it('is more than 50 characters', async () => {
        fireEvent.change(headerField, { target: { value: 'a'.repeat(31) } });
        fireEvent.blur(headerField);
        const headerError = await screen.findByTestId('headerError');
        expect(headerError).not.toBeNull();
        expect(headerError).toHaveTextContent(MAX_LENGTH_THRITY);
      });
    });
    describe('body', () => {
      it('is empty', async () => {
        fireEvent.blur(bodyField);
        const bodyError = await screen.findByTestId('bodyError');
        expect(bodyError).not.toBeNull();
        expect(bodyError).toHaveTextContent(REQUIRED);
      });
      it('is less than 10 characters', async () => {
        fireEvent.change(bodyField, { target: { value: 'a'.repeat(9) } });
        fireEvent.blur(bodyField);
        const bodyError = await screen.findByTestId('bodyError');
        expect(bodyError).not.toBeNull();
        expect(bodyError).toHaveTextContent(MIN_LENGTH_OF_TEN);
      });
      it('is more than 200 characters', async () => {
        fireEvent.change(bodyField, { target: { value: 'a'.repeat(201) } });
        fireEvent.blur(bodyField);
        const bodyError = await screen.findByTestId('bodyError');
        expect(bodyError).not.toBeNull();
        expect(bodyError).toHaveTextContent(MAX_LENGTH_TWO_HUNDRER);
      });
    });
  });
});
