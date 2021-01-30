import * as React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import DeleteAccount from '../index';

describe('DeleteAccount', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<DeleteAccount />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should not display ticket modal on mount', () => {
    const { queryByTestId } = render(<DeleteAccount />);
    const deleteModal = queryByTestId('deleteModal');
    expect(deleteModal).toBeNull();
  });
  it('open the ticket modal', () => {
    const { getByTestId } = render(<DeleteAccount />);
    const buttonDeleteModal = getByTestId('buttonDeleteModal');
    fireEvent.click(buttonDeleteModal);
    const deleteModal = screen.queryByTestId('deleteModal');
    expect(deleteModal).not.toBeNull();
  });
  it('should close the ticket modal', () => {
    const { getByTestId } = render(<DeleteAccount />);
    const buttonDeleteModal = getByTestId('buttonDeleteModal');
    fireEvent.click(buttonDeleteModal);
    fireEvent.click(buttonDeleteModal);
    const deleteModal = screen.queryByTestId('deleteModal');
    expect(deleteModal).toBeNull();
  });
});
