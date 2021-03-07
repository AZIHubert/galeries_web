import * as React from 'react';

import Image from '#components/Image';

import {
  Container,
  Link,
} from './styles';

interface ProfilePictureContainerI {
  id: string;
  profilePicture: ProfilePictureI,
}

const ProfilePicture = ({
  id,
  profilePicture: {
    cropedImage,
    pendingImage,
  },
}: ProfilePictureContainerI) => (
  <Container>
    <Link
      to={`/image/${id}`}
    >
      <Image
        original={cropedImage.signedUrl}
        pending={pendingImage.signedUrl}
      />
    </Link>
  </Container>
);

export default ProfilePicture;
