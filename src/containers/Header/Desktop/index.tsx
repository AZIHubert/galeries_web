import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
  useDispatch,
} from 'react-redux';

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

import Pictogram from './Pictogram';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import {
  Container,
  HeaderPart,
  InnerContainer,
  Logo,
  StyledLink,
} from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickHome = () => history.push('/');

  return (
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
            marginLeft={40}
            onClick={() => dispatch(fetchLogout())}
            small
            title='logout'
          />
        </HeaderPart>
      </InnerContainer>
    </Container>
  );
};

export default Header;
