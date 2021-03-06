import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const InnerContainer = styled.div`
  border-bottom: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  display: flex;
  height: ${({ theme }) => `${theme.header.home.height.small}px`};
  justify-content: space-between;
  margin: ${({ theme }) => `0 ${theme.wrapper.margin.smallest}px`};
  @media ${mediaQueries.mobileL} {
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.small}px`};
  }
  @media ${mediaQueries.laptop} {
    height: ${({ theme }) => `${theme.header.home.height.medium}px`};
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.medium}px`};
  }
  @media ${mediaQueries.laptopL} { 
    height: ${({ theme }) => `${theme.header.home.height.large}px`};
    margin: ${({ theme }) => `0 ${theme.wrapper.margin.large}px`};
  }
`;

export default InnerContainer;
