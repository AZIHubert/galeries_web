import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Welcolme = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 10px;
  @media ${mediaQueries.mobileL} {
    font-size: 1.6rem;
  }
  @media ${mediaQueries.tablet} {
    font-size: 2rem;
    margin-bottom: 12px;
  }
  @media ${mediaQueries.laptop} {
    font-size: 2.5rem;
    margin-bottom: 14px;
  }
  @media ${mediaQueries.laptopL} { 
    font-size: 2.9rem;
    margin-bottom: 17px;
  }
`;

export default Welcolme;
