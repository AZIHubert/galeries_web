import * as React from 'react';
import { useSelector } from 'react-redux';
import DotLoader from 'react-spinners/DotLoader';
import { CSSTransition } from 'react-transition-group';

import theme from '#helpers/theme';

import { profilePicturesStatusSelector } from '#store/selectors';

import {
  Container,
  Fader,
} from './styled';

const ProfilePicturesLoader = () => {
  const profilePicturesStatus = useSelector(profilePicturesStatusSelector);
  const isFetching = React.useMemo(() => profilePicturesStatus === 'fetching', [profilePicturesStatus]);

  return (
    <CSSTransition
      classNames='fade'
      in={isFetching}
      timeout={300}
      unmountOnExit
    >
      <Fader>
        <Container>
          <DotLoader
            color={theme.colors.primary}
            size={50}
          />
        </Container>
      </Fader>
    </CSSTransition>
  );
};

export default ProfilePicturesLoader;
