import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.smallest}px`
  )};
  padding-top: ${({ theme }) => (`${theme.header.dashboard.height.small + 70}px`)};
  @media ${mediaQueries.mobileL} {
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.small}px`
  )};
    padding-top: ${({ theme }) => (`${theme.header.dashboard.height.small + 80}px`)};
  }
  @media ${mediaQueries.laptop} {
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.medium}px`
  )};
    padding-top: ${({ theme }) => (`${theme.header.dashboard.height.small + 90}px`)};
  }
  @media ${mediaQueries.laptopL} { 
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.large}px`
  )};
    padding-top: ${({ theme }) => (`${theme.header.dashboard.height.small + 120}px`)};
  }
`;

export default Container;
