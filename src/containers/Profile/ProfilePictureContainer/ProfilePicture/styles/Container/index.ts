import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const ImageContainer = styled.div`
  height: ${({ theme }) => (
    `${theme.profile.smallest.cropedImage.size - theme.profile.smallest.cropedImage.margin * 2}px`
  )};
  margin: ${({ theme }) => `${theme.profile.smallest.cropedImage.margin}px`};
  overflow: hidden;
  position: relative;
  width: ${({ theme }) => (
    `${theme.profile.smallest.cropedImage.size - theme.profile.smallest.cropedImage.margin * 2}px`
  )};
  @media ${mediaQueries.mobileL} {
    height: ${({ theme }) => (
    `${theme.profile.small.cropedImage.size - theme.profile.small.cropedImage.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.profile.small.cropedImage.margin}px`};
    width: ${({ theme }) => (
    `${theme.profile.small.cropedImage.size - theme.profile.small.cropedImage.margin * 2}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => (
    `${theme.profile.medium.cropedImage.size - theme.profile.medium.cropedImage.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.profile.medium.cropedImage.margin}px`};
    width: ${({ theme }) => (
    `${theme.profile.medium.cropedImage.size - theme.profile.medium.cropedImage.margin * 2}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => (
    `${theme.profile.large.cropedImage.size - theme.profile.large.cropedImage.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.profile.large.cropedImage.margin}px`};
    width: ${({ theme }) => (
    `${theme.profile.large.cropedImage.size - theme.profile.large.cropedImage.margin * 2}px`
  )};
  }
`;

export default ImageContainer;
