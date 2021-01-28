import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import FacebookButton from '../index';

const Container = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <FacebookButton
      loading={loading}
      setLoading={setLoading}
      type='login'
    />
  );
};

describe('Modal', () => {
  const setLoading = jest.fn;
  it('renders without crashing', () => {
    const tree = renderer.create(
      <FacebookButton
        loading={false}
        setLoading={setLoading}
        type='login'
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not be disable on mount', () => {
    const { getByTestId } = render(
      <FacebookButton
        loading={false}
        setLoading={setLoading}
        type='signin'
      />,
    );
    const button = getByTestId('button');
    expect(button).not.toBeDisabled();
  });
  it('should display \'sign in with facebook if type is \'signin\'', () => {
    const { getByTestId } = render(
      <FacebookButton
        loading={false}
        setLoading={setLoading}
        type='signin'
      />,
    );
    const button = getByTestId('button');
    expect(button).toHaveTextContent('sign in with facebook');
  });
  it('should display \'log in with facebook if type is \'login\'', () => {
    const { getByTestId } = render(
      <FacebookButton
        loading={false}
        setLoading={setLoading}
        type='login'
      />,
    );
    const button = getByTestId('button');
    expect(button).toHaveTextContent('log in with facebook');
  });
  it('should be disabled after clicking', () => {
    const { getByTestId } = render(<Container />);
    const button = getByTestId('button');
    fireEvent.click(button);
    const buttonAfterClick = screen.getByTestId('button');
    expect(buttonAfterClick).toBeDisabled();
  });
});
