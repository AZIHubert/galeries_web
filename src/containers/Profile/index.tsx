import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { fetchProfilePictures } from '#store/actions';
import { profilePicturesStatusSelector } from '#store/selectors';

import ProfileHeader from './ProfileHeader';
import ProfilePictureContainer from './ProfilePictureContainer';

import { Container } from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const profilePicturesStatus = useSelector(profilePicturesStatusSelector);

  React.useEffect(() => {
    if (profilePicturesStatus === 'pending') {
      dispatch(fetchProfilePictures());
    }
  }, [profilePicturesStatus]);

  return (
    <Container>
      <ProfileHeader />
      <ProfilePictureContainer />
    </Container>
  );
};

export default Profile;
