import * as React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Button from '#components/Button';
import Modal from '#components/Modal';

import theme from '#helpers/theme';

import useWindowSize from '#hooks/useWindowSize';

import logo from '#ressources/svg/logoG.svg';
import {
  CreateGalerie,
  CreateGalerieHover,
  Home,
  HomeHover,
  Notification,
  NotificationHover,
} from '#ressources/svgComponents';

import { fetchLogout } from '#store/actions';
import { userSelector } from '#store/selectors';

import CreateGalerieModal from './CreateGalerieModal';
import ModalTicket from './ModalTicket';
import Pictogram from './Pictogram';
import ProfileButton from './ProfileButton';
import SlideMenu from './SlideMenu';

import {
  Container,
  Fader,
  HeaderPart,
  InnerContainer,
  Logo,
  StyledLink,
} from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSelector);
  const location = useLocation();
  const handleClickHome = () => history.push('/dashboard');
  const [menuMobile, setMenuMobile] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentModal, setCurrentModal] = React.useState<'createGalerie' | 'sendTicket' | null>(null);
  const { width } = useWindowSize();

  React.useEffect(() => {
    if (width && width < 768) {
      setMenuMobile(true);
    } else {
      setMenuMobile(false);
      setOpen(false);
    }
  }, [width]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenCreateGalerie = () => setCurrentModal('createGalerie');
  const handleOpenSendTicket = () => setCurrentModal('sendTicket');
  const handleCloseModal = () => setCurrentModal(null);

  const handleCurrentModal = () => {
    switch (currentModal) {
      case 'createGalerie':
        return (
          <CreateGalerieModal
            handleCloseCreateGalerie={handleCloseModal}
          />
        );
      case 'sendTicket':
        return (
          <ModalTicket
            handleClose={handleCloseModal}
          />
        );
      default:
        return null;
    }
  };

  const show = !!user
    && !location.pathname.includes('profilePicture')
    && !location.pathname.includes('updateEmail')
    && !location.pathname.includes('validateEmail')
    && !location.pathname.includes('galeriesPicture');

  return (
    <CSSTransition
      classNames='fade'
      in={show}
      timeout={300}
      unmountOnExit
    >
      <Fader>
        <Container>
          <InnerContainer>
            <HeaderPart>
              <StyledLink
                to='/dashboard'
              >
                <Logo
                  alt="header logo"
                  src={logo}
                />
              </StyledLink>
            </HeaderPart>
            {menuMobile ? (
              <HeaderPart>
                <button
                  onClick={handleOpen}
                >
                  <AiOutlineMenu
                    color={theme.colors.primary}
                    size={25}
                  />
                </button>
              </HeaderPart>
            ) : (
              <HeaderPart>
                <Pictogram
                  hoverPictogram={HomeHover}
                  marginRight={25}
                  marginRightL={35}
                  onClick={handleClickHome}
                  pictogram={Home}
                />
                <Pictogram
                  hoverPictogram={CreateGalerieHover}
                  marginRight={25}
                  marginRightL={35}
                  onClick={handleOpenCreateGalerie}
                  pictogram={CreateGalerie}
                />
                <Pictogram
                  hoverPictogram={NotificationHover}
                  pictogram={Notification}
                />
                <ProfileButton
                  handleOpenSendTicket={handleOpenSendTicket}
                />
                <Button.Header
                  onClick={() => dispatch(fetchLogout())}
                  small
                  styles={{
                    marginLeft: 40,
                  }}
                  title='logout'
                />
              </HeaderPart>
            )}
          </InnerContainer>
          <Modal.Portal
            handleClose={handleCloseModal}
            open={!!currentModal}
          >
            {handleCurrentModal()}
          </Modal.Portal>
        </Container>
        <SlideMenu
          handleClose={handleClose}
          handleOpenCreateGalerie={handleOpenCreateGalerie}
          handleOpenSendTicket={handleOpenSendTicket}
          open={open}
        />
      </Fader>
    </CSSTransition>
  );
};

export default Header;
