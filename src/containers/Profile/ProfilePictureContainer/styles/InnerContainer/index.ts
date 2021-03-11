import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const InnerContainer = styled.div.attrs(() => ({
  'data-testid': 'container',
}))`
  display: inline-flex;
  flex-wrap: wrap;
  margin: auto;
  width: ${({ theme }) => (
    `${theme.profile.smallest.cropedImage.numByRow * theme.profile.smallest.cropedImage.size}px`
  )};
  @media ${mediaQueries.mobileL} {
    width: ${({ theme }) => (
    `${theme.profile.small.cropedImage.numByRow * theme.profile.small.cropedImage.size}px`
  )};
  }
  @media ${mediaQueries.tablet} {
    width: ${({ theme }) => (
    `${theme.profile.medium.cropedImage.numByRow * theme.profile.medium.cropedImage.size}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    width: ${({ theme }) => (
    `${theme.profile.large.cropedImage.numByRow * theme.profile.large.cropedImage.size}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    width: ${({ theme }) => (
    `${theme.profile.largest.cropedImage.numByRow * theme.profile.largest.cropedImage.size}px`
  )};
  }
`;

export default InnerContainer;
