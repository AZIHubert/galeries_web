import * as React from 'react';
import {
  useSelector,
} from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Modal from '#components/Modal';

import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';

import { userSelector } from '#store/selectors';

import ModalTicket from './ModalTicket';
import PopupProfile from './PopupProfile';

import {
  Button,
  Container,
  ProfileImage,
} from './styles';

const ProfileButton = () => {
  const [openPopupProfil, setOpenPopupProfile] = React.useState<boolean>(false);
  const user = useSelector(userSelector);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [openTicket, setOpenTicket] = React.useState<boolean>(false);
  const handleOpenTicket = React.useCallback(() => setOpenTicket(true), []);
  const handleCloseTicket = React.useCallback(() => setOpenTicket(false), []);
  const handleClickOutside = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpenPopupProfile(false);
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
        data-testid='profilButton'
        onClick={() => setOpenPopupProfile((lastState) => !lastState)}
      >
        <ProfileImage
          alt='profile picture'
          src={defaultProfilePicture}
        />
        {user ? user.userName : 'user name'}
      </Button>
      <CSSTransition
        classNames='fade'
        in={openPopupProfil}
        timeout={500}
        unmountOnExit
      >
        <PopupProfile
          handleOpenTicket={handleOpenTicket}
        />
      </CSSTransition>
      <Modal
        handleClose={handleCloseTicket}
        open={openTicket}
      >
        <ModalTicket />
      </Modal>
    </Container>
  );
};

export default ProfileButton;
