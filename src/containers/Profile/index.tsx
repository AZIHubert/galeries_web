import * as React from 'react';
import { useSelector } from 'react-redux';

import { ProfilePictureProvider } from '#contexts/ProfilePictureContext';

import Footer from '#containers/Footer';
import ScrollToTop from '#components/ScrollToTop';
import Spinner from '#components/Spinner';

import { profilePicturesStatusSelector } from '#store/selectors';

import ProfileHeader from './ProfileHeader';
import ProfilePictureContainer from './ProfilePictureContainer';

import {
  Body,
  Container,
} from './styles';

const Profile = () => {
  const profilePicturesStatus = useSelector(profilePicturesStatusSelector);
  const isFetching = React.useMemo(
    () => profilePicturesStatus === 'fetching',
    [profilePicturesStatus],
  );
  return (
    <ProfilePictureProvider>
      <Container>
        <Body>
          <ProfileHeader />
          <ProfilePictureContainer />
          <Spinner
            show={isFetching}
          />
        </Body>
        <Footer />
        <ScrollToTop />
      </Container>
    </ProfilePictureProvider>
  );
};

export default Profile;
