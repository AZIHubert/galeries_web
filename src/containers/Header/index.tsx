import * as React from 'react';
import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

import HeaderButton from '#components/HeaderButton';

import createGalerie from '#ressources/svg/createGalerie.svg';
import home from '#ressources/svg/home.svg';
import logo from '#ressources/svg/logoG.svg';
import notification from '#ressources/svg/notification.svg';

import SearchBar from './SearchBar';
import ProfileButton from './ProfileButton';

const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  position: absolute;
  width: 100%;
`;

const InnerContainer = styled.div`
  border-bottom: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  display: flex;
  height: ${({ theme }) => `${theme.header.height.small}px`};
  justify-content: space-between;
  margin: ${({ theme }) => `0 ${theme.wrapper.margin.smallest}px`};
  @media ${mediaQueries.mobileL} {
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.small}px`};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => `${theme.header.height.medium}px`};
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.medium}px`};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => `${theme.header.height.large}px`};
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.large}px`};
  }
`;

const Logo = styled.img`
  margin-right: 40px;
  width: ${({ theme }) => (
    `${theme.header.logoWidth.medium}px`
  )};
  @media ${mediaQueries.laptopL} { 
    width: ${({ theme }) => (
    `${theme.header.logoWidth.large}px`
  )};
  }
`;

const LeftHeader = styled.div`
  align-items: center;
  display: flex;
`;

const RightHeader = styled.div`
  align-items: center;
  display: flex;
`;

const Header = () => (
  <Container>
    <InnerContainer>
      <LeftHeader>
        <Logo
          src={logo}
          alt="header logo"
        />
        <SearchBar />
      </LeftHeader>
      <RightHeader>
        <button>
          <img
            alt='home pictogram'
            src={home}
          />
        </button>
        <button>
          <img
            alt='create new galerie pictogram'
            src={createGalerie}
          />
        </button>
        <button>
          <img
            alt='notification pictogram'
            src={notification}
          />
        </button>
        <ProfileButton />
        <HeaderButton
          title='logout'
        />
      </RightHeader>
    </InnerContainer>
  </Container>
);

export default Header;
