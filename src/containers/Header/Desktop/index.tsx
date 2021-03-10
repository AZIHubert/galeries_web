import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Button from '#components/Button';

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

import Pictogram from './Pictogram';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
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

  return (
    <CSSTransition
      classNames='fade'
      in={!!user && !location.pathname.includes('profilePicture')}
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
              <SearchBar />
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
        </Container>
      </Fader>
    </CSSTransition>
  );
};

export default Header;
