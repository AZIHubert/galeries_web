import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import ReactRouterDOM from 'react-router-dom';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import { ProfilePictureContext } from '#contexts/ProfilePictureContext';
import reducers from '#store/reducers';

import ProfilePictureContainer from '../index';

const mockedStore = createStore(reducers);

const profilePicture = (id: string) => ({
  [id]: {
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
  },
});

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
  profilePictures = {},
}: {
  profilePictures?: { [name: string]: ProfilePictureI }
}) => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <ProfilePictureContext.Provider
        value={{
          ...ProfilePictureProviderValues,
          profilePictures,
        }}
      >
        <ProfilePictureContainer />
      </ProfilePictureContext.Provider>
    </ThemeProvider>
  </Provider>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDOM,
  Link: jest.fn(({ children }) => children),
}));
jest.mock('#components/Image', () => ({
  __esModule: true,
  A: true,
  default: () => <div></div>,
}));

describe('ProfilePictureContainer', () => {
  it('should have 0 profile picture', () => {
    const { getByTestId } = render(<Container />);
    expect(getByTestId('container').children.length).toBe(0);
  });
  it('should have 1 profile picture', () => {
    const { getByTestId } = render(
      <Container
        profilePictures={{
          ...profilePicture('0'),
        }}
      />,
    );
    expect(getByTestId('container').children.length).toBe(1);
  });
  it('should have 10 profile pictures', () => {
    const { getByTestId } = render(
      <Container
        profilePictures={{
          ...profilePicture('0'),
          ...profilePicture('1'),
          ...profilePicture('2'),
          ...profilePicture('3'),
          ...profilePicture('4'),
          ...profilePicture('5'),
          ...profilePicture('6'),
          ...profilePicture('7'),
          ...profilePicture('8'),
          ...profilePicture('9'),
        }}
      />,
    );
    expect(getByTestId('container').children.length).toBe(10);
  });
});
