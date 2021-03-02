import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const InnerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  border-bottom: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  height: ${({ theme }) => `${theme.header.dashboard.height.small}px`};
  justify-content: space-between;
  margin: ${({ theme }) => `0 ${theme.wrapper.margin.smallest}px`};
  @media ${mediaQueries.mobileL} {
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.small}px`};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => `${theme.header.dashboard.height.medium}px`};
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.medium}px`};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => `${theme.header.dashboard.height.large}px`};
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.large}px`};
  }
`;

export default InnerContainer;
