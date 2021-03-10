import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import ReactRouterDOM from 'react-router-dom';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import reducers from '#store/reducers';

import ProfilePicture from '../index';

const defaultId = 'defaultId';
const opacity = 'opacity';
const puttingImage = 'puttingImage';

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
  id = defaultId,
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ProfilePictureContext.Provider
        value={{
          ...ProfilePictureProviderValues,
          puttingImage,
        }}
      >
        <ProfilePicture
          id={id}
          profilePicture={{
            createdAt: new Date(),
            cropedImage: {
              bucketName: 'bucketName',
              fileName: 'fileName',
              format: 'format',
              height: 0,
              id: 'id',
              signedUrl: 'signedUrl',
              size: 0,
              width: 0,
            },
            id: 'id',
            originalImage: {
              bucketName: 'bucketName',
              fileName: 'fileName',
              format: 'format',
              height: 0,
              id: 'id',
              signedUrl: 'signedUrl',
              size: 0,
              width: 0,
            },
            pendingImage: {
              bucketName: 'bucketName',
              fileName: 'fileName',
              format: 'format',
              height: 0,
              id: 'id',
              signedUrl: 'signedUrl',
              size: 0,
              width: 0,
            },
          }}
        />
      </ProfilePictureContext.Provider>
    </ThemeProvider>
  </Provider>
);

const spinnerContainer = 'spinnerContainer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDOM,
  Link: jest.fn(({ children }) => children),
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
jest.mock('#components/Image', () => ({
  __esModule: true,
  A: true,
  default: () => <div></div>,
}));

describe('ProfilePicture', () => {
  it('should have an opacity of 1 if id is not the same as puttingImage', () => {
    const { getByTestId } = render(<Container />);
    expect(getByTestId(opacity)).toHaveStyle('opacity: 1');
  });
  it('should not display BounceLoader if id is not the same as puttingImage', () => {
    const { queryByTestId } = render(<Container />);
    expect(queryByTestId(spinnerContainer)).toBeFalsy();
  });
  it('should have an opacity of 0.5 if ids are the same', () => {
    const { getByTestId } = render(
      <Container
        id={puttingImage}
      />,
    );
    expect(getByTestId(opacity)).toHaveStyle('opacity: 0.5');
  });
  it('should display BounceLoader if ids are the same', () => {
    const { getByTestId } = render(
      <Container
        id={puttingImage}
      />,
    );
    expect(getByTestId(spinnerContainer)).toBeTruthy();
  });
});
