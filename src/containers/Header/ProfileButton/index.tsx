import * as React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';

import PopupProfile from './PopupProfile';

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-left: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  border-right: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 1.1rem;
  padding: 0 30px;
  &:focus {
    outline: none;
  }
`;

const ProfileButtonImage = styled.img`
  border: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  border-radius: 50%;
  height: 36px;
  margin-right: 20px;
  width: 36px;
`;

const ProfileButton = () => {
  const [openPopupProfil, setOpenPopupProfile] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpenPopupProfile(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
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
        <ProfileButtonImage
          alt='profile picture'
          src={defaultProfilePicture}
        />
          userName
      </Button>
      <CSSTransition
        classNames='fade'
        in={openPopupProfil}
        timeout={500}
        unmountOnExit
      >
        <PopupProfile />
      </CSSTransition>
    </Container>
  );
};

export default ProfileButton;
