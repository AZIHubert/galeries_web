import * as React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import theme from '#helpers/theme';

import { LogoGaleries } from '#ressources/svgComponents';

import { fetchLogout } from '#store/actions';

import {
  Background,
  Button,
  Container,
  Fader,
  GaleriesLogo,
  Link,
  Part,
} from './styles';

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

  React.useEffect(() => {
    if (!open) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [containerRef]);

  const handleClickOutside = React.useCallback((event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      handleClose();
    }
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
            <Part
              alignment='right'
              bottom
            >
              <Button
                onClick={handleClose}
              >
                <IoCloseSharp
                  color={theme.colors.primary}
                  size={23}
                />
              </Button>
            </Part>
            <Part
              alignment='center'
            >
              <GaleriesLogo>
                <LogoGaleries />
              </GaleriesLogo>
            </Part>
            <Part
              bottom
            >
              <Link
                onClick={handleClose}
                to='/dashboard'
              >
                Home
              </Link>
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
            </Part>
            <Part>
              <Link
                onClick={handleClose}
                to='/profile'
              >
                See&nbsp;your&nbsp;profile
              </Link>
              <Link
                onClick={handleClose}
                to='/edit'
              >
                Edit&nbsp;your&nbsp;informations
              </Link>
              <Button
                onClick={() => {
                  handleOpenSendTicket();
                  handleClose();
                }}
              >
                Send&nbsp;a&nbsp;ticket
              </Button>
            </Part>
          </div>
          <Part>
            <Button
              onClick={() => {
                dispatch(fetchLogout());
                handleClose();
              }}
            >
              Logout
            </Button>
          </Part>
        </Container>
        <Background />
      </Fader>
    </CSSTransition>
  );
};

export default SlideMenu;
