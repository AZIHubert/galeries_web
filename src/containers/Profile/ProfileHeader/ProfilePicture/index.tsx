import * as React from 'react';
import { useSelector } from 'react-redux';

import Image from '#components/Image';

import {
  profilePictureCurrentSelector,
  profilePictureStatusSelector,
} from '#store/selectors';

import {
  Container,
  InnerContainer,
} from './styles';

const ProfilePicture = () => {
  const { croped, pending } = useSelector(profilePictureCurrentSelector);
  const profilePictureStatus = useSelector(profilePictureStatusSelector);

  const isPending = profilePictureStatus === 'fetching';

  return (
    <Container>
      <InnerContainer
        isPending={isPending}
      >
        <Image
          original={croped}
          pending={pending}
        />
      </InnerContainer>
    </Container>
  );
};

export default ProfilePicture;
