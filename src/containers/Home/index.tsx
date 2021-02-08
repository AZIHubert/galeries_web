import * as React from 'react';
import styled from 'styled-components';

import LogoGFill from '#ressources/svg/logoGFill.svg';
import mediaQueries from '#helpers/mediaQueries';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const BodyContainer = styled.div`
  margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.medium}px 0 ${theme.wrapper.margin.medium}px`
  )};
  @media ${mediaQueries.laptopL} { 
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.large}px 0 ${theme.wrapper.margin.large}px`
  )};
  }
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 99vh;
`;

const Container = styled.div`
  background-image: url(${LogoGFill});
  background-repeat: no-repeat;
  background-position: bottom 10% right 8%;
  background-size: 350px;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.4;
  top: 0;
  left: 0;
  z-index: -1;
  @media ${mediaQueries.laptopL} { 
    background-size: 400px;
  }
`;

const Home = () => (
  <>
    <Header />
    <BodyContainer>
      <Body />
      <Footer />
    </BodyContainer>
    <Container />
  </>
);

export default Home;
