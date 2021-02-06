import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import renderer from 'react-test-renderer';

import { UserContext, UserProvider } from '#contexts/UserContext';

import {
  ImageI,
  ProfilePictureI,
  UserI,
} from '#helpers/interfaces';

import ModalProfilePicture from '../index';

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
    <ModalProfilePicture
      profilePicture={newProfilePicture}
    />
  );
};

describe('Body', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ModalProfilePicture
        profilePicture={newProfilePicture}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should format date properly', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const uploadAtText = getByTestId('uploadAtText');
    expect(uploadAtText).toHaveTextContent('February 5th 2021');
  });
  it('should format weight properly', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const weightText = getByTestId('weightText');
    expect(weightText).toHaveTextContent('98.49 KB');
  });
  it('should format size properly', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const sizeText = getByTestId('sizeText');
    expect(sizeText).toHaveTextContent('1080 x 2340 px');
  });
  it('should display profilePicture button properly if not current', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const modalProfilePictureButton = getByTestId('modalProfilePictureButton');
    expect(modalProfilePictureButton).toHaveTextContent('use as profile picture');
  });
  it('should display profilePicture button properly if current', async () => {
    const userWithCurrentProfilePicture = {
      ...newUser,
      currentProfilePictureId: newProfilePicture.id,
      currentProfilePicture: newProfilePicture,
    };
    const { getByTestId } = render(
      <UserProvider>
        <Container
          defaultUser={userWithCurrentProfilePicture}
        />
      </UserProvider>,
    );
    const modalProfilePictureButton = getByTestId('modalProfilePictureButton');
    expect(modalProfilePictureButton).toHaveTextContent('remove profile picture');
  });
  it('should switch current when clicking on profilePicture button', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const modalProfilePictureButton = getByTestId('modalProfilePictureButton');
    fireEvent.click(modalProfilePictureButton);
    const profilePictureButtonWithCurrentTrue = screen
      .getByTestId('modalProfilePictureButton');
    expect(profilePictureButtonWithCurrentTrue)
      .toHaveTextContent('remove profile picture');
    fireEvent.click(modalProfilePictureButton);
    const profilePictureButtonWithCurrentFalse = screen
      .getByTestId('modalProfilePictureButton');
    expect(profilePictureButtonWithCurrentFalse)
      .toHaveTextContent('use as profile picture');
  });
});
