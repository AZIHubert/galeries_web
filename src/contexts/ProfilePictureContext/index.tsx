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

export const defaultValue = {
  deletingImage: '',
  profilePicture: {
    croped: '',
    original: '',
    pending: '',
  },
  isPosting: false,
  profilePictures: {},
  puttingImage: null,
  setDeletingImage: () => {},
  setPuttingImage: () => {},
};

export const ProfilePictureContext = React.createContext<{
  deletingImage: string | null;
  profilePicture: {
    croped: string;
    original: string;
    pending: string;
  },
  isPosting: boolean;
  profilePictures: { [name: string]: ProfilePictureI }
  puttingImage: string | null,
  setDeletingImage: React.Dispatch<React.SetStateAction<string | null>>,
  setPuttingImage: React.Dispatch<React.SetStateAction<string | null>>,
}>(defaultValue);

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

  const [action, setAction] = React.useState<store.Status>('pending');
  const [profilePicture, setProfilePicture] = React.useState(profilePictureSelect);
  const [profilePictures, setProfilePictures] = React.useState<{
    [name: string]: ProfilePictureI
  }>({});
  const [puttingImage, setPuttingImage] = React.useState<string | null>(null);
  const [deletingImage, setDeletingImage] = React.useState<string | null>(null);
  const [waitingTimer, setWaitingTimer] = React.useState<boolean>(false);

  const isPosting = React.useMemo(() => action === 'posting', [action]);

  // fetch profile pictures
  // is profilepictures status is pending
  // and user is logged in
  React.useEffect(() => {
    if (
      profilePicturesStatus === 'pending'
      && user
    ) {
      dispatch(fetchProfilePictures());
    }
  }, [
    profilePicturesStatus,
    user,
  ]);

  // Set into local state profilePicturesSelect
  // everytime request success
  React.useLayoutEffect(() => {
    if (profilePicturesStatus === 'success') {
      setProfilePictures(ProfilePicturesSelect);
    }
  }, [profilePicturesStatus]);

  // Refetch profile pictures
  // if delete an image
  // and profile pictures length < 10
  // and it's not the end of fetching
  React.useEffect(() => {
    if (
      !end
      && profilePicturesStatus === 'success'
      && Object.keys(ProfilePicturesSelect).length <= 10
    ) {
      dispatch(fetchProfilePictures());
    }
  }, [
    end,
    ProfilePicturesSelect,
    profilePicturesStatus,
  ]);

  // dispatch fetch profile pictures
  // if reach bottom
  // profilePictures status is not currently fetching
  // and it's not the end of datas
  React.useEffect(() => {
    if (
      bottomReach
      && !end
      && profilePicturesStatus !== 'fetching'
      && profilePicturesStatus !== 'pending'
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
    if (
      profilePictureStatus === 'posting'
      || profilePictureStatus === 'putting'
      || profilePictureStatus === 'delete'
    ) {
      setWaitingTimer(true);
      timer.current = setTimeout(() => setWaitingTimer(false), 1000);
      setAction(profilePictureStatus);
    }
  }, [profilePictureStatus]);

  // clear timer on unmount
  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // when timer is done
  // and new profile picture request === success
  // upload profilePicture/profilePictures local state
  React.useLayoutEffect(() => {
    if (
      !waitingTimer
      && (
        profilePictureStatus === 'success'
        || profilePictureStatus === 'error'
      )
    ) {
      setProfilePicture(profilePictureSelect);
      setProfilePictures(ProfilePicturesSelect);
      setPuttingImage(null);
      setAction(profilePictureStatus);
      setDeletingImage(null);
    }
  }, [
    action,
    profilePictureStatus,
    waitingTimer,
  ]);

  return (
    <ProfilePictureContext.Provider
      value={{
        deletingImage,
        isPosting,
        profilePicture,
        profilePictures,
        puttingImage,
        setDeletingImage,
        setPuttingImage,
      }}
    >
      {children}
    </ProfilePictureContext.Provider>
  );
};
