import * as React from 'react';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import {
  ImageI,
  ProfilePictureI,
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

const Container = () => {
  const [current, setCurrent] = React.useState<boolean>(false);
  const switchCurrent = () => {
    setCurrent((prevState) => !prevState);
  };
  return (
    <>
      <ProfilePicture
        profilePicture={newProfilePicture}
        switchCurrent={switchCurrent}
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
  const mockSwitchCurrent = jest.fn;
  it('renders without crashing', () => {
    const tree = renderer.create(<ProfilePicture
      switchCurrent={mockSwitchCurrent}
      profilePicture={newProfilePicture}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('shouls switch current', () => {
    const { getByTestId } = render(<Container />);
    const profilePictureButton = getByTestId('profilePictureButton');
    fireEvent.click(profilePictureButton);
    const checkCurrentStateTrue = screen.getByTestId('checkCurrentState');
    expect(checkCurrentStateTrue).toHaveTextContent('true');
    fireEvent.click(profilePictureButton);
    const checkCurrentStateFalse = screen.getByTestId('checkCurrentState');
    expect(checkCurrentStateFalse).toHaveTextContent('false');
  });
});
