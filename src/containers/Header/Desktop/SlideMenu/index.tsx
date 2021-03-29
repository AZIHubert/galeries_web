import * as React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import themeColor from '#helpers/theme';

import { fetchLogout } from '#store/actions';

import { LogoGaleries } from '#ressources/svgComponents';

const Container = styled.div.attrs(
  () => ({
    className: 'slideMenu',
  }),
)`
  overflow-x: hidden;
  transition: ${({ theme }) => theme.transition.default};
  background-color: ${({ theme }) => theme.colors.secondary};
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 300;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Background = styled.div.attrs(
  () => ({
    className: 'background',
  }),
)`
  background-color: ${({ theme }) => theme.colors.black};
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

interface ButtonsContainerI {
  bottom?: boolean;
  alignment?: 'left' | 'right' | 'center';
}

const ButtonsContainer = styled.div<ButtonsContainerI>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignment }) => {
    switch (alignment) {
      case 'center':
        return 'center';
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
  margin-bottom: ${({ bottom }) => (bottom ? '10px' : 0)};
  padding-bottom: ${({ bottom }) => (bottom ? '10px' : 0)};
`;

ButtonsContainer.defaultProps = {
  bottom: false,
  alignment: 'left',
};

const Button = styled.button`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transition.default};
  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const CustomLink = styled(NavLink)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transition.default};
  &.active {
    color: ${({ theme }) => theme.colors.black};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Fader = styled.div`
  &.fade-enter {
    & .background {
      opacity: 0;
    }
    & .slideMenu {
      opacity: 0;
      width: 0;
    }
  }
  &.fade-enter-active {
    & .background {
      opacity: 0.7;
      transition: 500ms;
    }
    & .slideMenu {
      opacity: 1;
      width: 250px;
      transition: 500ms;
    }
  }
  &.fade-enter-done {
    & .background {
      opacity: 0.7;
    }
    & .slideMenu {
      opacity: 1;
      width: 250px;
    }
  }
  &.fade-exit {
    & .background {
      opacity: 0.7;
    }
    & .slideMenu {
      opacity: 1;
      width: 250px;
    }
  }
  &.fade-exit-active {
    & .background {
      opacity: 0;
      transition: 500ms;
    }
    & .slideMenu {
      opacity: 0;
      width: 0;
      transition: 500ms;
    }
  }
  &.fade-exit-done {
    & .background {
      opacity: 0;
    }
    & .slideMenu {
      opacity: 0;
      width: 0;
    }
  }
`;

const GaleriesLogo = styled.h2`
  margin-bottom: 30px;
  width: 90px;
`;

interface SlideMenuI {
  handleClose: () => void;
  handleOpenCreateGalerie: () => void;
  handleOpenSendTicket: () => void;
  open: boolean;
}

const SlideMenu = ({
  handleClose,
  handleOpenCreateGalerie,
  handleOpenSendTicket,
  open,
}: SlideMenuI) => {
  const dispatch = useDispatch();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const handleClickOutside = React.useCallback((event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      handleClose();
    }
  }, [containerRef]);

  React.useEffect(() => {
    if (!open) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [containerRef]);

  return (
    <CSSTransition
      classNames='fade'
      in={open}
      timeout={300}
      unmountOnExit
    >
      <Fader>
        <Container
          ref={containerRef}
        >
          <div>
            <ButtonsContainer
              bottom
              alignment='right'
            >
              <Button
                onClick={handleClose}
              >
                <IoCloseSharp
                  color={themeColor.colors.primary}
                  size={23}
                />
              </Button>
            </ButtonsContainer>
            <ButtonsContainer
              alignment='center'
            >
              <GaleriesLogo>
                <LogoGaleries />
              </GaleriesLogo>
            </ButtonsContainer>
            <ButtonsContainer
              bottom
            >
              <CustomLink
                to='/dashboard'
                onClick={handleClose}
              >
                Home
              </CustomLink>
              <Button
                onClick={() => {
                  handleOpenCreateGalerie();
                  handleClose();
                }}
              >
                Create&nbsp;a&nbsp;galerie
              </Button>
              <Button>
                Notifications
              </Button>
            </ButtonsContainer>
            <ButtonsContainer>
              <CustomLink
                to='/profile'
                onClick={handleClose}
              >
                See&nbsp;your&nbsp;profile
              </CustomLink>
              <CustomLink
                to='/edit'
                onClick={handleClose}
              >
                Edit&nbsp;your&nbsp;informations
              </CustomLink>
              <Button
                onClick={() => {
                  handleOpenSendTicket();
                  handleClose();
                }}
              >
                Send&nbsp;a&nbsp;ticket
              </Button>
            </ButtonsContainer>
          </div>
          <ButtonsContainer>
            <Button
              onClick={() => {
                handleClose();
                dispatch(fetchLogout());
              }}
            >
              Logout
            </Button>
          </ButtonsContainer>
        </Container>
        <Background />
      </Fader>
    </CSSTransition>
  );
};

export default SlideMenu;
