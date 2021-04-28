import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const InnerContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin: auto;
  width: ${({ theme }) => (
    `${theme.galerie.smallest.card.numByRow * theme.galerie.smallest.card.size}px`
  )};
  @media ${mediaQueries.mobileL} {
    width: ${({ theme }) => (
    `${theme.galerie.small.card.numByRow * theme.galerie.small.card.size}px`
  )};
  }
  @media ${mediaQueries.tablet} {
    width: ${({ theme }) => (
    `${theme.galerie.medium.card.numByRow * theme.galerie.medium.card.size}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    width: ${({ theme }) => (
    `${theme.galerie.large.card.numByRow * theme.galerie.large.card.size}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    width: ${({ theme }) => (
    `${theme.galerie.largest.card.numByRow * theme.galerie.largest.card.size}px`
  )};
  }
`;

export default InnerContainer;
