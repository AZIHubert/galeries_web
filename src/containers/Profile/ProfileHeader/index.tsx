import * as React from 'react';

import Information from './Information';
import ProfilePicture from './ProfilePicture';

import { Container } from './styles';

const ProfileHeader = () => (
  <Container>
    <ProfilePicture />
    <Information />
  </Container>
);

export default ProfileHeader;
