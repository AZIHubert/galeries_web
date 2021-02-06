import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import {
  UserContext,
  UserProvider,
} from '#contexts/UserContext';

import {
  ImageI,
  ProfilePictureI,
  UserI,
} from '#helpers/interfaces';

import ProfilePicture from '../index';

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
  const { setUser, user } = React.useContext(UserContext);
  React.useEffect(() => {
    setUser(defaultUser);
  }, []);
  const current = user
    ? user.currentProfilePictureId === newProfilePicture.id
    : null;
  return (
    <>
      <ProfilePicture
        profilePicture={newProfilePicture}
      />
      <p
        data-testid='checkCurrentState'
      >
        {current ? 'true' : 'false'}
      </p>
    </>
  );
};

describe('ProfilePicture', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<ProfilePicture
      profilePicture={newProfilePicture}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('shouls switch current', () => {
    const { getByTestId } = render(
      <UserProvider>
        <Container />
      </UserProvider>,
    );
    const profilePictureButton = getByTestId('profilePictureButton');
    fireEvent.click(profilePictureButton);
    const checkCurrentStateTrue = screen.getByTestId('checkCurrentState');
    expect(checkCurrentStateTrue).toHaveTextContent('true');
    fireEvent.click(profilePictureButton);
    const checkCurrentStateFalse = screen.getByTestId('checkCurrentState');
    expect(checkCurrentStateFalse).toHaveTextContent('false');
  });
});
