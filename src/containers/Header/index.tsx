import * as React from 'react';
import {
  Link,
  useHistory,
} from 'react-router-dom';
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
  const history = useHistory();

  const handleClickHome = () => history.push('/');

  return (
    <Container>
      <InnerContainer>
        <HeaderPart>
          <Link to='/'>
            <Logo
              alt="header logo"
              src={logo}
            />
          </Link>
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

/*
LS.NavFixedItem_LINK = styled(Link)`
  display: flex;
  justify-content: ${props => props.$tempLeftProp ? 'flex-start' : 'center'}; // '$' added
  align-items: center;
`;
*/
