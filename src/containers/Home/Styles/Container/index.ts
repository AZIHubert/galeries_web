import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.smallest}px`
  )};
  min-height: 100vh;
  @media ${mediaQueries.mobileL} {
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.small}px`
  )};
  }
  @media ${mediaQueries.laptop} {
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.medium}px`
  )};
  }
  @media ${mediaQueries.laptopL} { 
    margin: ${({ theme }) => (
    `0 ${theme.wrapper.margin.large}px`
  )};
  }
`;

export default Container;
