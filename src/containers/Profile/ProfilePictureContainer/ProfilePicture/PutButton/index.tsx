import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import { putProfilePicture } from '#store/actions';
import { userSelector } from '#store/selectors';

import {
  Container,
} from './styles';

interface PutButtonI {
  id: string;
}

const PutButton = ({
  id,
}: PutButtonI) => {
  const {
    deletingImage,
    puttingImage,
    setPuttingImage,
  } = React.useContext(ProfilePictureContext);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const isCurrent = () => {
    if (user && user.currentProfilePictureId === id) {
      return true;
    }
    return false;
  };

  const handleClick = () => {
    if (!puttingImage && !deletingImage) {
      dispatch(putProfilePicture({ id }));
      setPuttingImage(id);
    }
  };

  return (
    <Container
      current={isCurrent()}
      onClick={handleClick}
    />
  );
};

export default PutButton;
