import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  isMobile: boolean;
}

const Container = styled.div<ContainerI>`
  height: ${({ theme }) => (
    `${theme.profile.smallest.cropedImage.size - theme.profile.smallest.cropedImage.margin * 2}px`
  )};
  margin: ${({ theme }) => `${theme.profile.smallest.cropedImage.margin}px`};
  overflow: hidden;
  position: relative;
  width: ${({ theme }) => (
    `${theme.profile.smallest.cropedImage.size - theme.profile.smallest.cropedImage.margin * 2}px`
  )};
  & .button {
    opacity: ${({ isMobile }) => (isMobile ? 1 : 0)};
    transform: ${({ isMobile }) => (isMobile ? 'scale(1)' : 'scale(0)')};
  }
  &:hover .button {
    opacity: 1;
    transform: scale(1);
  }
  @media ${mediaQueries.mobileL} {
    height: ${({ theme }) => (
    `${theme.profile.small.cropedImage.size - theme.profile.small.cropedImage.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.profile.small.cropedImage.margin}px`};
    width: ${({ theme }) => (
    `${theme.profile.small.cropedImage.size - theme.profile.small.cropedImage.margin * 2}px`
  )};
  }
  @media ${mediaQueries.tablet} {
    height: ${({ theme }) => (
    `${theme.profile.medium.cropedImage.size - theme.profile.medium.cropedImage.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.profile.medium.cropedImage.margin}px`};
    width: ${({ theme }) => (
    `${theme.profile.medium.cropedImage.size - theme.profile.medium.cropedImage.margin * 2}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => (
    `${theme.profile.large.cropedImage.size - theme.profile.large.cropedImage.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.profile.large.cropedImage.margin}px`};
    width: ${({ theme }) => (
    `${theme.profile.large.cropedImage.size - theme.profile.large.cropedImage.margin * 2}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => (
    `${theme.profile.largest.cropedImage.size - theme.profile.largest.cropedImage.margin * 2}px`
  )};
    margin: ${({ theme }) => `${theme.profile.largest.cropedImage.margin}px`};
    width: ${({ theme }) => (
    `${theme.profile.largest.cropedImage.size - theme.profile.largest.cropedImage.margin * 2}px`
  )};
  }
`;

Container.defaultProps = {
  isMobile: false,
};

export default Container;
