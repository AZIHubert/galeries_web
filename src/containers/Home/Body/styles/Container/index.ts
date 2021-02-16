import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  margin-bottom: 11vh;
  padding-top: ${({ theme }) => (
    `${theme.header.home.height.medium + 20}px`
  )};
   @media ${mediaQueries.mobileL} {
    margin-left: 50px;
  }
  @media ${mediaQueries.tablet} {
    margin-left: 80px;
  }
  @media ${mediaQueries.laptop} {
    margin-left: 120px;
  }
  @media ${mediaQueries.laptopL} { 
    margin-left: 180px;
  }
`;

export default Container;
