import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.footer`
  margin-bottom: 10px;
  font-size: 0.65rem;
  font-weight: lighter;
  @media ${mediaQueries.mobileL} {
    font-size: 0.7rem;
  }
  @media ${mediaQueries.laptopL} { 
    font-size: 0.9rem;
  }
`;

export default Container;
