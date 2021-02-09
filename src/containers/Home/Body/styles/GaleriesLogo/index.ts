import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const GaleriesLogo = styled.h1`
  margin-bottom: 30px;
  width: 270px;
  @media ${mediaQueries.mobileL} {
    margin-bottom: 30px;
    width: 290px;
  }
  @media ${mediaQueries.tablet} {
    margin-bottom: 50px;
    width: 350px;
  }
  @media ${mediaQueries.laptop} {
    width: 420px;
  }
  @media ${mediaQueries.laptopL} { 
    margin-bottom: 55px;
    width: 520px;
  }
`;

export default GaleriesLogo;
