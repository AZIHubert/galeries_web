import * as React from 'react';
import styled from 'styled-components';

import { LogoGaleries } from '#ressources/svgComponents';
import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  padding-top: ${({ theme }) => (
    `${theme.header.height.medium + 20}px`
  )};
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  margin-bottom: 11vh;
  @media ${mediaQueries.mobileL} {
    margin-left: 50px;
  }
  @media ${mediaQueries.tablet} {
    margin-left: 80px;
  }
  @media ${mediaQueries.laptop} {
    margin-left: 120px;
  }
  @media ${mediaQueries.laptopL} { 
    margin-left: 180px;
  }
`;

const Welcolme = styled.h2`
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 10px;
  @media ${mediaQueries.mobileL} {
    font-size: 1.6rem;
  }
  @media ${mediaQueries.tablet} {
    font-size: 2rem;
    margin-bottom: 12px;
  }
  @media ${mediaQueries.laptop} {
    font-size: 2.5rem;
    margin-bottom: 14px;
  }
  @media ${mediaQueries.laptopL} { 
    font-size: 2.9rem;
    margin-bottom: 17px;
  }
`;

const Galeries = styled.h1`
  width: 270px;
  margin-bottom: 30px;
  @media ${mediaQueries.mobileL} {
    width: 290px;
    margin-bottom: 30px;
  }
  @media ${mediaQueries.tablet} {
    width: 350px;
    margin-bottom: 50px;
  }
  @media ${mediaQueries.laptop} {
    width: 420px;
  }
  @media ${mediaQueries.laptopL} { 
    width: 520px;
    margin-bottom: 55px;
  }
`;
const Text = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.35rem;
  margin-left: 50px;
  @media ${mediaQueries.mobileL} {
    margin-left: 60px;
  }
  @media ${mediaQueries.tablet} {
    margin-left: 120px;
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  @media ${mediaQueries.laptopL} { 
    font-size: 1.4rem;
    line-height: 1.7rem;
    margin-left: 145px;
  }
`;

const Body = () => (
  <Container>
    <TextContainer>
      <Welcolme>
        Welcome to
      </Welcolme>
      <Galeries>
        <LogoGaleries />
      </Galeries>
      <Text>
        A web app to share
      </Text>
      <Text>
        pictures with
      </Text>
      <Text>
        your friends and family.
      </Text>
    </TextContainer>
  </Container>
);

export default Body;
