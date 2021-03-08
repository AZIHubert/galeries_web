import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import reducers from '#store/reducers';

import ProfilePicture from '../index';

const mockedStore = createStore(reducers);

const ProfilePictureProviderValues = {
  isPosting: false,
  isPuttong: false,
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
  isPutting = false,
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ProfilePictureContext.Provider
        value={{
          ...ProfilePictureProviderValues,
          isPosting,
          isPutting,
        }}
      >
        <ProfilePicture />
      </ProfilePictureContext.Provider>
    </ThemeProvider>
  </Provider>
);

const spinner = 'spinner';
const imageContainer = 'imageContainer';

jest.mock('#components/Image', () => ({
  __esModule: true,
  A: true,
  default: () => <div></div>,
}));

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

describe('ProfilePicture', () => {
  it('should not display spinner if is not fetching/posting', () => {
    const { queryByTestId } = render(
      <Container />,
    );
    expect(queryByTestId(spinner)).toBeFalsy();
  });
  it('should have an opacity of 1 if not fetching/posting', () => {
    const { getByTestId } = render(
      <Container />,
    );
    expect(getByTestId(imageContainer)).toHaveStyle('opacity: 1');
  });
  it('should display spinner if is fetching', () => {
    const { getByTestId } = render(
      <Container
        isPosting
      />,
    );
    expect(getByTestId(spinner)).toBeTruthy();
  });
  it('should display spinner is is posting', () => {
    const { getByTestId } = render(
      <Container
        isPutting
      />,
    );
    expect(getByTestId(spinner)).toBeTruthy();
  });
  it('should have an opacity of 0.1 if is fetching', () => {
    const { getByTestId } = render(
      <Container
        isPosting
      />,
    );
    expect(getByTestId(imageContainer)).toHaveStyle('opacity: 0.1');
  });
  it('should have an opacity of 0.1 if is posting', () => {
    const { getByTestId } = render(
      <Container
        isPutting
      />,
    );
    expect(getByTestId(imageContainer)).toHaveStyle('opacity: 0.1');
  });
});
