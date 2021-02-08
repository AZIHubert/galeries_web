import * as React from 'react';
import styled from 'styled-components';

import { LogoGaleries } from '#ressources/svgComponents';
import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  padding-top: ${({ theme }) => (
    `${theme.header.height + 20}px`
  )};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`;

const TextContainer = styled.div`
  margin-left: 150px;
  margin-bottom: 80px;
  @media ${mediaQueries.laptopL} { 
    margin-left: 250px;
    margin-bottom: 120px;
  }
`;

const Welcolme = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 15px;
  @media ${mediaQueries.laptopL} { 
    font-size: 4rem;
  }
`;

const Galeries = styled.h1`
  width: 430px;
  margin-bottom: 55px;
  @media ${mediaQueries.laptopL} { 
    width: 600px;
  }
`;
const Text = styled.p`
  margin-left: 150px;
  font-style: italic;
  font-size: 1.35rem;
  line-height: 1.45rem;
  @media ${mediaQueries.laptopL} { 
    margin-left: 200px;
    font-size: 1.6rem;
    line-height: 1.6rem;
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
