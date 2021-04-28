import * as React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Image from '#components/Image';
import Text from '#components/Text';

import {
  profilePictureCurrentSelector,
  userSelector,
} from '#store/selectors';

import PopupProfile from './PopupProfile';
import {
  Button,
  Container,
  ProfileImage,
} from './styles';

interface ProfileButtonI {
  popupProfileTestId?: string;
  handleOpenSendTicket: () => void;
}

const ProfileButton = ({
  popupProfileTestId,
  handleOpenSendTicket,
}: ProfileButtonI) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { croped, pending } = useSelector(profilePictureCurrentSelector);
  const user = useSelector(userSelector);
  const [openPopupProfil, setOpenPopupProfile] = React.useState<boolean>(false);

  const handleClosePopup = () => setOpenPopupProfile(false);

  const handleClickOutside = React.useCallback((event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      handleClosePopup();
    }
  }, [containerRef]);

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <Container
      ref={containerRef}
    >
      <Button
        onClick={() => setOpenPopupProfile((lastState) => !lastState)}
      >
        <ProfileImage>
          <Image
            mode='fill'
            original={croped}
            pending={pending}
          />
        </ProfileImage>
        <div>
          <Text
            color='primary'
          >
            {user ? user.pseudonym : 'pseudonym'}
          </Text>
          <Text
            styles={{
              fontSize: 0.55,
            }}
          >
            {user ? user.userName : '@userName'}
          </Text>
        </div>
      </Button>
      <CSSTransition
        classNames='fade'
        in={openPopupProfil}
        timeout={500}
        unmountOnExit
      >
        <PopupProfile
          handleClose={handleClosePopup}
          handleOpenTicket={handleOpenSendTicket}
          testId={popupProfileTestId}
        />
      </CSSTransition>
    </Container>
  );
};

export default ProfileButton;
