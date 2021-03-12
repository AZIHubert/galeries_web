import * as React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Image from '#components/Image';
import Modal from '#components/Modal';
import Text from '#components/Text';

import {
  profilePictureCurrentSelector,
  userSelector,
} from '#store/selectors';

import ModalTicket from './ModalTicket';
import PopupProfile from './PopupProfile';
import {
  Button,
  Container,
  ProfileImage,
} from './styles';

interface ProfileButtonI {
  modalTestId?: string;
  popupProfileTestId?: string;
}

const ProfileButton = ({
  modalTestId,
  popupProfileTestId,
}: ProfileButtonI) => {
  const handleCloseTicket = React.useCallback(() => setOpenTicket(false), []);
  const handleOpenTicket = React.useCallback(() => setOpenTicket(true), []);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { croped, pending } = useSelector(profilePictureCurrentSelector);
  const user = useSelector(userSelector);
  const [openPopupProfil, setOpenPopupProfile] = React.useState<boolean>(false);
  const [openTicket, setOpenTicket] = React.useState<boolean>(false);

  const handleClosePopup = () => setOpenPopupProfile(false);

  const handleClickOutside = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      handleClosePopup();
    }
  };

  React.useEffect(() => {
    if (!openTicket) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <Container
      ref={containerRef}
    >
      <Button
        onClick={() => setOpenPopupProfile((lastState) => !lastState)}
      >
        <ProfileImage>
          <Image
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
          handleOpenTicket={handleOpenTicket}
          testId={popupProfileTestId}
        />
      </CSSTransition>
      <Modal.Portal
        handleClose={handleCloseTicket}
        modalTestId={modalTestId}
        open={openTicket}
      >
        <ModalTicket
          handleClose={handleCloseTicket}
        />
      </Modal.Portal>
    </Container>
  );
};

export default ProfileButton;
