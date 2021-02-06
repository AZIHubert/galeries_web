import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import renderer from 'react-test-renderer';

import {
  UserContext,
  UserProvider,
} from '#contexts/UserContext';

import {
  ImageI,
  ProfilePictureI,
  UserI,
} from '#helpers/interfaces';

import Profile from '../index';

const newImage: ImageI = {
  bucketName: 'bucketName',
  fileName: 'fileName',
  format: 'jpg',
  height: 2340,
  id: '1',
  signedUrl: 'http://url.com',
  size: 100857,
  width: 1080,
};
const newProfilePicture: ProfilePictureI = {
  createdAt: new Date('2021-02-05 18:42:02.528+01'),
  cropedImage: newImage,
  id: '1',
  originalImage: newImage,
  pendingImage: newImage,
};

const newUser: UserI = {
  createdAt: new Date('2021-02-05 18:42:02.528+01'),
  currentProfilePicture: null,
  currentProfilePictureId: null,
  defaultProfilePicture: null,
  email: 'user@email.com',
  facebookId: null,
  googleId: null,
  id: '1',
  profilePictures: [newProfilePicture],
  role: 'admin',
  updatedAt: null,
  userName: 'user',
};

const Container = ({
  defaultUser = newUser,
}: {
  defaultUser?: UserI
}) => {
  const { setUser } = React.useContext(UserContext);
  React.useEffect(() => {
    setUser(defaultUser);
  }, []);
  return (
    <Profile />
  );
};

describe('Profile', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render local profile picture if currentProfilePictureId and defaultProfilePicture are null', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const currentProfilePicture = getByTestId('currentProfilePicture');
    expect(currentProfilePicture).toHaveAttribute('src', '#ressources/images/defaultProfilePicture.png');
  });
  it('should render default profile picture if currentProfilePictureId is null and defaultProfilePicture is set', () => {
    const userWithDefaultProfilePicture: UserI = {
      ...newUser,
      defaultProfilePicture: 'defaultProfilePicture',
    };
    const { getByTestId } = render(
      <UserProvider>
        <Container
          defaultUser={userWithDefaultProfilePicture}
        />
      </UserProvider>,
    );
    const currentProfilePicture = getByTestId('currentProfilePicture');
    expect(currentProfilePicture).toHaveAttribute('src', 'defaultProfilePicture');
  });
  it('should render profile picture if currentProfilePicture is set', () => {
    const userWithCurrentProfilePicture: UserI = {
      ...newUser,
      currentProfilePicture: newProfilePicture,
      currentProfilePictureId: newProfilePicture.id,
    };
    const { getByTestId } = render(
      <UserProvider>
        <Container
          defaultUser={userWithCurrentProfilePicture}
        />
      </UserProvider>,
    );
    const currentProfilePicture = getByTestId('currentProfilePicture');
    expect(currentProfilePicture).toHaveAttribute('src', newProfilePicture.originalImage.signedUrl);
  });
  it('should render profile picture, if currentProfilePicture and defaultProfilePicture are set', () => {
    const userWithCurrentProfilePicture: UserI = {
      ...newUser,
      currentProfilePicture: newProfilePicture,
      currentProfilePictureId: newProfilePicture.id,
      defaultProfilePicture: 'defaultProfilePicture',
    };
    const { getByTestId } = render(
      <UserProvider>
        <Container
          defaultUser={userWithCurrentProfilePicture}
        />
      </UserProvider>,
    );
    const currentProfilePicture = getByTestId('currentProfilePicture');
    expect(currentProfilePicture).toHaveAttribute('src', newProfilePicture.originalImage.signedUrl);
  });
  it('should render username', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const userNameText = getByTestId('userNameText');
    expect(userNameText).toHaveTextContent(newUser.userName);
  });
  it('should set picture if currentProfileProfile is null', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const profilePictureButton = getByTestId('profilePictureButton');
    fireEvent.click(profilePictureButton);
    const currentProfilePicture = screen.getByTestId('currentProfilePicture');
    expect(currentProfilePicture).toHaveAttribute('src', newProfilePicture.originalImage.signedUrl);
  });
  it('should remove profile if currentProfilePicture is not null', () => {
    const userWithCurrentProfilePicture: UserI = {
      ...newUser,
      currentProfilePicture: newProfilePicture,
      currentProfilePictureId: newProfilePicture.id,
    };
    const { getByTestId } = render(
      <UserProvider>
        <Container
          defaultUser={userWithCurrentProfilePicture}
        />
      </UserProvider>,
    );
    const profilePictureButton = getByTestId('profilePictureButton');
    fireEvent.click(profilePictureButton);
    const currentProfilePicture = screen.getByTestId('currentProfilePicture');
    expect(currentProfilePicture).toHaveAttribute('src', '#ressources/images/defaultProfilePicture.png');
  });
  it('should add a profile picture', () => {
    const file = new File(['blob'], 'image.png', { type: 'image/png' });
    const { getByTestId, getAllByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const previousProfilePictures = getAllByTestId('profilePicture');
    const inputFile = getByTestId('inputFile');
    fireEvent.change(inputFile, { target: { files: [file] } });
    const profilePictures = screen.getAllByTestId('profilePicture');
    const currentProfilePicture = screen.getByTestId('currentProfilePicture');
    expect(profilePictures.length).toBe(previousProfilePictures.length + 1);
    expect(currentProfilePicture).toHaveProperty('src', 'http://newprofilepicture.com/');
  });
});
