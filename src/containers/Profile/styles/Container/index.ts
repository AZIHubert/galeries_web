import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  margin: ${({ theme }) => (
    `${theme.header.dashboard.height.small + 70}px ${theme.wrapper.margin.smallest}px 0 ${theme.wrapper.margin.smallest}px`
  )};
  @media ${mediaQueries.mobileL} {
    margin: ${({ theme }) => (
    `${theme.header.dashboard.height.small + 80}px ${theme.wrapper.margin.small}px 0 ${theme.wrapper.margin.small}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    margin: ${({ theme }) => (
    `${theme.header.dashboard.height.medium + 90}px ${theme.wrapper.margin.medium}px 0 ${theme.wrapper.margin.medium}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    margin: ${({ theme }) => (
    `${theme.header.dashboard.height.large + 120}px ${theme.wrapper.margin.large}px 0 ${theme.wrapper.margin.large}px`
  )};
  }
`;

export default Container;
