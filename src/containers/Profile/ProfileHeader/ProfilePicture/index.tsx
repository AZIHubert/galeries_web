import * as React from 'react';
import { useSelector } from 'react-redux';

import Image from '#components/Image';

import selectProfilePicture from '#helpers/selectProfilePicture';

import { userSelector } from '#store/selectors';

import {
  Container,
  InnerContainer,
} from './styles';

const ProfilePicture = () => {
  const user = useSelector(userSelector);
  const { croped, pending } = selectProfilePicture(user);
  return (
    <Container>
      <InnerContainer>
        <Image
          original={croped}
          pending={pending}
        />
      </InnerContainer>
    </Container>
  );
};

export default ProfilePicture;
