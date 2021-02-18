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

import ProfilePictureContainer from '../index';

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
const profilePictureOne: ProfilePictureI = {
  createdAt: new Date('2021-02-05 18:42:02.528+01'),
  cropedImage: newImage,
  id: '1',
  originalImage: newImage,
  pendingImage: newImage,
};
const profilePictureTwo: ProfilePictureI = {
  ...profilePictureOne,
  id: '2',
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
  profilePictures: [profilePictureOne],
  role: 'admin',
  updatedAt: null,
  userName: 'user',
};

const Container = ({
  defaultUser = newUser,
}: {
  defaultUser?: UserI;
}) => {
  const { setUser, user } = React.useContext(UserContext);
  React.useEffect(() => {
    setUser(defaultUser);
  }, []);
  return (
    <>
      <ProfilePictureContainer />
      {user && user.currentProfilePictureId ? (
        <p
          data-testid='currentId'
        >
          {user.currentProfilePictureId}
        </p>
      ) : null}
    </>
  );
};

describe('ProfilePictureContainer', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<ProfilePictureContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render one profile picture', () => {
    const { getAllByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const profilePictures = getAllByTestId('profilePicture');
    expect(profilePictures.length).toBe(1);
  });
  it('should render Two profile picture', () => {
    const userWithTwoProfilePictures = {
      ...newUser,
      profilePictures: [
        profilePictureOne,
        profilePictureTwo,
      ],
    };
    const { getAllByTestId } = render(
      <UserProvider>
        <Container
          defaultUser={userWithTwoProfilePictures}
        />
      </UserProvider>,
    );
    const profilePictures = getAllByTestId('profilePicture');
    expect(profilePictures.length).toBe(2);
  });
  it('should set current profile id on click', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const profilePictureButton = getByTestId('profilePictureButton');
    fireEvent.click(profilePictureButton);
    const currentId = screen.getByTestId('currentId');
    expect(currentId).toHaveTextContent(profilePictureOne.id);
  });
  it('should set to null profile id if is the same on click', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const profilePictureButton = getByTestId('profilePictureButton');
    fireEvent.click(profilePictureButton);
    fireEvent.click(profilePictureButton);
    const currentId = screen.queryByTestId('currentId');
    expect(currentId).toBeNull();
  });
  it('should switch current id', () => {
    const userWithTwoProfilePictures = {
      ...newUser,
      profilePictures: [
        profilePictureOne,
        profilePictureTwo,
      ],
    };
    const { getAllByTestId } = render(
      <UserProvider>
        <Container
          defaultUser={userWithTwoProfilePictures}
        />
      </UserProvider>,
    );
    const secondProfilePictureButton = getAllByTestId('profilePictureButton')[1];
    fireEvent.click(secondProfilePictureButton);
    const currentId = screen.queryByTestId('currentId');
    expect(currentId).toHaveTextContent(profilePictureTwo.id);
  });
});
