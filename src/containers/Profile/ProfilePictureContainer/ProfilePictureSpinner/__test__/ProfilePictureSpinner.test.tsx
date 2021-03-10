import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import reducers from '#store/reducers';

import ProfilePictureSpinner from '../index';

const mockedStore = createStore(reducers);

const ProfilePictureProviderValues = {
  isPosting: false,
  isPutting: false,
  profilePicture: {
    croped: '',
    original: '',
    pending: '',
  },
  profilePictures: {},
  puttingImage: null,
  setPuttingImage: () => {},
};

const Container = ({
  isPosting = false,
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ProfilePictureContext.Provider
        value={{
          ...ProfilePictureProviderValues,
          isPosting,
        }}
      >
        <ProfilePictureSpinner />
      </ProfilePictureContext.Provider>
    </ThemeProvider>
  </Provider>
);

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn((props) => (
    props.in ? (
      <FakeTransition>
        {props.children}
      </FakeTransition>
    ) : null));
  return {
    CSSTransition: FakeCSSTransition,
    Transition: FakeTransition,
  };
});

const spinnerContainer = 'spinnerContainer';

describe('ProfilePictureSpinner', () => {
  it('should display spinner if is posting', () => {
    const { getByTestId } = render(
      <Container
        isPosting
      />,
    );
    expect(getByTestId(spinnerContainer)).toBeTruthy();
  });
  it('should not display spinner if is not posting', () => {
    const { queryByTestId } = render(<Container/>);
    expect(queryByTestId(spinnerContainer)).toBeFalsy();
  });
});
