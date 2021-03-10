import {
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {
  defaultValue,
  ProfilePictureContext,
} from '#contexts/ProfilePictureContext';
import ThemeProvider from '#contexts/ThemeContext';

import reducers from '#store/reducers';

import Information from '../index';

const mockedStore = createStore(reducers);
const file = new File(['(⌐□_□)'], 'file.xml', { type: 'application/xml' });

const mockedDispatch = jest.fn();
const mockedPostProfilePicture = jest.fn();

jest.mock('react-redux', () => ({
  Provider: jest.fn(({ children }) => children),
  useDispatch: () => mockedDispatch,
  useSelector: jest.fn(),
}));
jest.mock('#store/actions/profilePicture.actions', () => ({
  postProfilePicture: () => mockedPostProfilePicture,
}));

const Container = ({
  isPosting = false,
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ProfilePictureContext.Provider
        value={{
          ...defaultValue,
          isPosting,
        }}
      >
        <Information />
      </ProfilePictureContext.Provider>
    </ThemeProvider>
  </Provider>
);

describe('Information', () => {
  it('should click on file input when clicking on button', () => {
    const {
      getByTestId,
      getByText,
    } = render(<Container />);
    const inputFile = getByTestId('inputFile');
    inputFile.click = jest.fn();
    fireEvent.click(getByText(('Add a profile picture')));
    expect(inputFile.click).toHaveBeenCalled();
  });
  it('should not click on file input if isPosting is true', () => {
    const {
      getByTestId,
      getByText,
    } = render(
      <Container
        isPosting={true}
      />,
    );
    const inputFile = getByTestId('inputFile');
    inputFile.click = jest.fn();
    fireEvent.click(getByText(('Add a profile picture')));
    expect(inputFile.click).not.toHaveBeenCalled();
  });
  it('should dispatch profilePicture when file input change', () => {
    const {
      getByTestId,
    } = render(<Container />);
    fireEvent.change(getByTestId('inputFile'), {
      target: {
        files: [file],
      },
    });
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenCalledWith(mockedPostProfilePicture);
  });
  it('should not dispatch profile picture if isPosting is true', () => {
    const {
      getByTestId,
    } = render(
      <Container
        isPosting={true}
      />,
    );
    fireEvent.change(getByTestId('inputFile'), {
      target: {
        files: [file],
      },
    });
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });
});
