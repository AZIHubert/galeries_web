import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Button from '#components/Button';
import Modal from '#components/Modal';

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
import Pictogram from './Pictogram';
import ProfileButton from './ProfileButton';
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
  const handleClickHome = () => history.push('/');
  const [openCreateGalerie, setOpenCreateGalerie] = React.useState<boolean>(false);

  const handleOpenCreateGalerie = () => setOpenCreateGalerie(true);
  const handleCloseCreateGalerie = () => setOpenCreateGalerie(false);

  const show = !!user
    && !location.pathname.includes('profilePicture')
    && !location.pathname.includes('updateEmail')
    && !location.pathname.includes('validateEmail');

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
                to='/'
              >
                <Logo
                  alt="header logo"
                  src={logo}
                />
              </StyledLink>
            </HeaderPart>
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
              <ProfileButton />
              <Button.Header
                onClick={() => dispatch(fetchLogout())}
                small
                styles={{
                  marginLeft: 40,
                }}
                title='logout'
              />
            </HeaderPart>
          </InnerContainer>
          <Modal.Portal
            handleClose={handleCloseCreateGalerie}
            open={openCreateGalerie}
          >
            <CreateGalerieModal
              handleCloseCreateGalerie={handleCloseCreateGalerie}
            />
          </Modal.Portal>
        </Container>
      </Fader>
    </CSSTransition>
  );
};

export default Header;
