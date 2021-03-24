import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface CoverPictureI {
  backgroundColor: string;
}

const CoverPicture = styled.div<CoverPictureI>`
  background-image: ${({ backgroundColor }) => backgroundColor};
  height: ${({ theme }) => (
    `${
      theme.galerie.smallest.card.size * 0.7 * 0.85
      - theme.galerie.smallest.card.margin * 2
    }px`
  )};
  width: 100%;
  @media ${mediaQueries.mobileL} {
    height: ${({ theme }) => (
    `${
      theme.galerie.small.card.size * 0.7 * 0.85
      - theme.galerie.small.card.margin * 2
    }px`
  )};
  }
  @media ${mediaQueries.tablet} {
    height: ${({ theme }) => (
    `${
      theme.galerie.medium.card.size * 0.7 * 0.85
      - theme.galerie.medium.card.margin * 2
    }px`
  )};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => (
    `${
      theme.galerie.large.card.size * 0.7 * 0.85
      - theme.galerie.large.card.margin * 2
    }px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => (
    `${
      theme.galerie.largest.card.size * 0.7 * 0.85
      - theme.galerie.largest.card.margin * 2
    }px`
  )};
  }
`;

export default CoverPicture;
