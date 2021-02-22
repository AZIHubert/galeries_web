import * as React from 'react';
import {
  useDispatch,
} from 'react-redux';

import HeaderButton from '#components/HeaderButton';

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
} from './styles';

const Header = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <InnerContainer>
        <HeaderPart>
          <Logo
            src={logo}
            alt="header logo"
          />
          <SearchBar />
        </HeaderPart>
        <HeaderPart>
          <Pictogram
            hoverPictogram={HomeHover}
            pictogram={Home}
            marginRight={25}
            marginRightL={35}
          />
          <Pictogram
            hoverPictogram={CreateGalerieHover}
            pictogram={CreateGalerie}
            marginRight={25}
            marginRightL={35}
          />
          <Pictogram
            hoverPictogram={NotificationHover}
            pictogram={Notification}
          />
          <ProfileButton />
          <HeaderButton
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
