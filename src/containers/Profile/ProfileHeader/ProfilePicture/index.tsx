import * as React from 'react';
import { useSelector } from 'react-redux';

import selectProfilePicture from '#helpers/selectProfilePicture';

import { userSelector } from '#store/selectors';

import {
  Container,
  Image,
  InnerContainer,
} from './styles';

const ProfilePicture = () => {
  const user = useSelector(userSelector);
  return (
    <Container>
      <InnerContainer>
        <Image
          data-testid='currentProfilePicture'
          src={selectProfilePicture(user)}
          alt='current profile picture'
        />
      </InnerContainer>
    </Container>
  );
};

export default ProfilePicture;
