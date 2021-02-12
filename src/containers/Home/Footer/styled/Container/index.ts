import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.footer`
  font-size: 0.65rem;
  font-weight: lighter;
  margin-bottom: 10px;
  @media ${mediaQueries.mobileL} {
    font-size: 0.7rem;
  }
  @media ${mediaQueries.laptopL} { 
    font-size: 0.9rem;
  }
`;

export default Container;
