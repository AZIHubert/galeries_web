import * as React from 'react';

import { ProfilePictureProvider } from '#contexts/ProfilePictureContext';

import Footer from '#containers/Footer';
import ScrollToTop from '#components/ScrollToTop';

import ProfileHeader from './ProfileHeader';
import ProfilePictureContainer from './ProfilePictureContainer';
import ProfilePicturesLoader from './ProfilePicturesLoader';

import { Container } from './styles';

const Profile = () => (
  <ProfilePictureProvider>
    <Container>
      <ProfileHeader />
      <ProfilePictureContainer />
      <ProfilePicturesLoader />
      <ScrollToTop />
      <Footer />
    </Container>
  </ProfilePictureProvider>
);

export default Profile;
