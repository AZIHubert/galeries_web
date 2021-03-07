import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import useReachBottom from '#hooks/useReachBottom';

import {
  fetchProfilePictures,
} from '#store/actions';
import {
  profilePictureCurrentSelector,
  profilePictureStatusSelector,
  profilePicturesEndSelector,
  profilePicturesSelector,
  profilePicturesStatusSelector,
  userSelector,
} from '#store/selectors';

export const ProfilePictureContext = React.createContext<{
  profilePicture: {
    croped: string;
    original: string;
    pending: string;
  },
  isFetching: boolean,
  isPosting: boolean,
  setPuttingImage: React.Dispatch<React.SetStateAction<string | null>>,
  puttingImage: string | null,
  profilePictures: { [name: string]: ProfilePictureI }
}>({
  profilePicture: {
    croped: '',
    original: '',
    pending: '',
  },
  isFetching: false,
  isPosting: false,
  setPuttingImage: () => {},
  puttingImage: null,
  profilePictures: {},
});

export const ProfilePictureProvider: React.FC<{}> = ({ children }) => {
  const dispatch = useDispatch();

  const bottomReach = useReachBottom(40);

  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const end = useSelector(profilePicturesEndSelector);
  const profilePictureSelect = useSelector(profilePictureCurrentSelector);
  const ProfilePicturesSelect = useSelector(profilePicturesSelector);
  const profilePictureStatus = useSelector(profilePictureStatusSelector);
  const profilePicturesStatus = useSelector(profilePicturesStatusSelector);
  const user = useSelector(userSelector);

  const [puttingImage, setPuttingImage] = React.useState<string | null>(null);
  const [action, setAction] = React.useState<'pending' | 'post' | 'put'>('pending');
  const [profilePicture, setProfilePicture] = React.useState(profilePictureSelect);
  const [profilePictures, setProfilePictures] = React.useState<{
    [name: string]: ProfilePictureI
  }>({});
  const [waitingTimer, setWaitingTimer] = React.useState<boolean>(false);

  // fetch profile pictures
  // is profilepictures status is pending
  // and user is logged in
  React.useEffect(() => {
    if (profilePicturesStatus === 'pending' && user) {
      dispatch(fetchProfilePictures());
    }
  }, [
    profilePicturesStatus,
    user,
  ]);

  // Set into local state profilePicturesSelect
  // everytime request success
  React.useEffect(() => {
    if (profilePicturesStatus === 'success') {
      setProfilePictures(ProfilePicturesSelect);
    }
  }, [profilePicturesStatus]);

  // dispatch fetch profile pictures
  // if reach bottom
  // profilePictures status is not currently fetching
  // and it's not the end of datas
  React.useEffect(() => {
    if (
      bottomReach
      && !end
      && profilePicturesStatus !== 'fetching'
    ) {
      dispatch(fetchProfilePictures());
    }
  }, [
    bottomReach,
    end,
    profilePicturesStatus,
  ]);

  // trigger timer when upload new profile pictures
  React.useEffect(() => {
    if (profilePictureStatus === 'fetching' || profilePictureStatus === 'put') {
      setWaitingTimer(true);
      timer.current = setTimeout(() => setWaitingTimer(false), 1000);
      if (profilePictureStatus === 'fetching') setAction('post');
      if (profilePictureStatus === 'put') setAction('put');
    }
  }, [profilePictureStatus]);

  // clear timer on unmount
  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // when timer is done
  // and new profile picture request === success
  // upload profilePicture/profilePictures local state
  React.useEffect(() => {
    if (!waitingTimer && profilePictureStatus === 'success') {
      setProfilePicture(profilePictureSelect);
      setProfilePictures(ProfilePicturesSelect);
      setPuttingImage(null);
    }
  }, [
    action,
    profilePictureStatus,
    waitingTimer,
  ]);

  React.useEffect(() => {
    if (profilePictureStatus === 'put') {
      setAction('put');
    }
  }, [profilePictureStatus]);

  const isFetching = (waitingTimer || profilePictureStatus === 'fetching') && action === 'post';
  const isPosting = (waitingTimer || profilePictureStatus === 'fetching') && action === 'put';

  return (
    <ProfilePictureContext.Provider
      value={{
        isFetching,
        isPosting,
        profilePicture,
        profilePictures,
        puttingImage,
        setPuttingImage,
      }}
    >
      {children}
    </ProfilePictureContext.Provider>
  );
};
