import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const CatchPhrase = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.35rem;
  margin-left: 50px;
  @media ${mediaQueries.mobileL} {
    margin-left: 60px;
  }
  @media ${mediaQueries.tablet} {
    font-size: 1.2rem;
    line-height: 1.5rem;
    margin-left: 120px;
  }
  @media ${mediaQueries.laptopL} { 
    font-size: 1.4rem;
    margin-left: 145px;
    line-height: 1.7rem;
  }
`;

export default CatchPhrase;
