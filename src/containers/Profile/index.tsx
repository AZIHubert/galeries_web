import * as React from 'react';

import { ProfilePictureProvider } from '#contexts/ProfilePictureContext';

import Footer from '#containers/Footer';
import ScrollToTop from '#components/ScrollToTop';

import ProfileHeader from './ProfileHeader';
import ProfilePictureContainer from './ProfilePictureContainer';
import ProfilePicturesLoader from './ProfilePicturesLoader';

import {
  Body,
  Container,
} from './styles';

const Profile = () => (
  <ProfilePictureProvider>
    <Container>
      <Body>
        <ProfileHeader />
        <ProfilePictureContainer />
        <ProfilePicturesLoader />
      </Body>
      <Footer />
      <ScrollToTop />
    </Container>
  </ProfilePictureProvider>
);

export default Profile;
