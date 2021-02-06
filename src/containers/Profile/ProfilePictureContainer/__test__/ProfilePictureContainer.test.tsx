import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import renderer from 'react-test-renderer';

import {
  ImageI,
  ProfilePictureI,
} from '#helpers/interfaces';

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

const Container = ({
  defaultCurrentProfileId = null,
  profilePictures = [profilePictureOne],
}: {
  defaultCurrentProfileId?: string | null;
  profilePictures?: ProfilePictureI[];
}) => {
  const [
    currentProfileId,
    setCurrentProfileId,
  ] = React.useState<string | null>(defaultCurrentProfileId);
  const switchCurrent = (id: string) => {
    setCurrentProfileId((prevState) => (prevState === id ? null : id));
  };
  return (
    <>
      <ProfilePictureContainer
        currentProfileId={currentProfileId}
        profilePictures={profilePictures}
        switchCurrent={switchCurrent}
      />
      {currentProfileId ? (
        <p
          data-testid='currentId'
        >
          {currentProfileId}
        </p>
      ) : null}
    </>
  );
};

describe('ProfilePictureContainer', () => {
  const mockedSwitchCurrent = jest.fn;
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<ProfilePictureContainer
      currentProfileId='1'
      profilePictures={[profilePictureOne]}
      switchCurrent={mockedSwitchCurrent}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render one profile picture', () => {
    const { getAllByTestId } = render(<ProfilePictureContainer
      currentProfileId='1'
      profilePictures={[profilePictureOne]}
      switchCurrent={mockedSwitchCurrent}
    />);
    const profilePictures = getAllByTestId('profilePicture');
    expect(profilePictures.length).toBe(1);
  });
  it('should render Two profile picture', () => {
    const { getAllByTestId } = render(<ProfilePictureContainer
      currentProfileId='1'
      profilePictures={[
        profilePictureOne,
        profilePictureTwo,
      ]}
      switchCurrent={mockedSwitchCurrent}
    />);
    const profilePictures = getAllByTestId('profilePicture');
    expect(profilePictures.length).toBe(2);
  });
  it('should set current profile id on click', () => {
    const { getByTestId } = render(<Container />);
    const profilePictureButton = getByTestId('profilePictureButton');
    fireEvent.click(profilePictureButton);
    const currentId = screen.getByTestId('currentId');
    expect(currentId).toHaveTextContent(profilePictureOne.id);
  });
  it('should set to null profile id if is the same on click', () => {
    const { getByTestId } = render(<Container />);
    const profilePictureButton = getByTestId('profilePictureButton');
    fireEvent.click(profilePictureButton);
    fireEvent.click(profilePictureButton);
    const currentId = screen.queryByTestId('currentId');
    expect(currentId).toBeNull();
  });
  it('should switch current id', () => {
    const { getAllByTestId } = render(<Container
      profilePictures={[profilePictureOne, profilePictureTwo]}
      defaultCurrentProfileId={profilePictureOne.id}
    />);
    const secondProfilePictureButton = getAllByTestId('profilePictureButton')[1];
    fireEvent.click(secondProfilePictureButton);
    const currentId = screen.queryByTestId('currentId');
    expect(currentId).toHaveTextContent(profilePictureTwo.id);
  });
});
