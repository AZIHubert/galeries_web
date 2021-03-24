import {
  Link,
} from 'react-router-dom';
import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled(Link)`
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  height: ${({ theme }) => (
    `${theme.galerie.smallest.card.size * 0.7 - theme.galerie.smallest.card.margin * 2}px`
  )};
  width: ${({ theme }) => (
    `${theme.galerie.smallest.card.size - theme.galerie.smallest.card.margin * 2}px`
  )};
  overflow: hidden;
  border-radius: 12px;
  margin: ${({ theme }) => `${theme.galerie.smallest.card.margin}px`};
  @media ${mediaQueries.mobileL} {
    height: ${({ theme }) => (
    `${theme.galerie.small.card.size * 0.7 - theme.galerie.small.card.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.galerie.small.card.margin}px`};
    width: ${({ theme }) => (
    `${theme.galerie.small.card.size - theme.galerie.small.card.margin * 2}px`
  )};
  }
  @media ${mediaQueries.tablet} {
    height: ${({ theme }) => (
    `${theme.galerie.medium.card.size * 0.7 - theme.galerie.medium.card.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.galerie.medium.card.margin}px`};
    width: ${({ theme }) => (
    `${theme.galerie.medium.card.size - theme.galerie.medium.card.margin * 2}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => (
    `${theme.galerie.large.card.size * 0.7 - theme.galerie.large.card.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.galerie.large.card.margin}px`};
    width: ${({ theme }) => (
    `${theme.galerie.large.card.size - theme.galerie.large.card.margin * 2}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => (
    `${theme.galerie.largest.card.size * 0.7 - theme.galerie.largest.card.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.galerie.largest.card.margin}px`};
    width: ${({ theme }) => (
    `${theme.galerie.largest.card.size - theme.galerie.largest.card.margin * 2}px`
  )};
  }
`;

export default Container;
