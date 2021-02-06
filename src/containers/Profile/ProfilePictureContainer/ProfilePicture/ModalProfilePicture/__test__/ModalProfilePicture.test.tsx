import {
  cleanup,
  render,
} from '@testing-library/react';
import * as React from 'react';
import renderer from 'react-test-renderer';

import {
  ImageI,
  ProfilePictureI,
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
    const { getByTestId } = render(<ModalProfilePicture
      profilePicture={newProfilePicture}
    />);
    const uploadAtText = getByTestId('uploadAtText');
    expect(uploadAtText).toHaveTextContent('February 5th 2021');
  });
  it('should format weight properly', () => {
    const { getByTestId } = render(<ModalProfilePicture
      profilePicture={newProfilePicture}
    />);
    const weightText = getByTestId('weightText');
    expect(weightText).toHaveTextContent('98.49 KB');
  });
  it('should format size properly', () => {
    const { getByTestId } = render(<ModalProfilePicture
      profilePicture={newProfilePicture}
    />);
    const sizeText = getByTestId('sizeText');
    expect(sizeText).toHaveTextContent('1080 x 2340 px');
  });
});
