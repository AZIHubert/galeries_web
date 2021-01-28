import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import GoogleButton from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <GoogleButton
      loading={loading}
      setLoading={setLoading}
      type='login'
    />
  );
};

describe('GoogleButton', () => {
  const setLoading = jest.fn;
  it('renders without crashing', () => {
    const tree = renderer.create(
      <GoogleButton
        loading={false}
        setLoading={setLoading}
        type={'login'}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display \'log in with Google if type is \'login\'', () => {
    const { getByTestId } = render(
      <GoogleButton
        loading={false}
        setLoading={setLoading}
        type='login'
      />,
    );
    const button = getByTestId('button');
    expect(button).toHaveTextContent('log in with Google');
  });
  it('should display \'sign in with facebook if type is \'signin\'', () => {
    const { getByTestId } = render(
      <GoogleButton
        loading={false}
        setLoading={setLoading}
        type='signin'
      />,
    );
    const button = getByTestId('button');
    expect(button).toHaveTextContent('sign in with Google');
  });
  it('should not be disable on mount', () => {
    const { getByTestId } = render(
      <GoogleButton
        loading={false}
        setLoading={setLoading}
        type='signin'
      />,
    );
    const button = getByTestId('button');
    expect(button).not.toBeDisabled();
  });
  it('should be disabled after clicking', () => {
    const { getByTestId } = render(<Container />);
    const button = getByTestId('button');
    fireEvent.click(button);
    const buttonAfterClick = screen.getByTestId('button');
    expect(buttonAfterClick).toBeDisabled();
  });
});
