import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Logo = styled.h1`
  margin: 70px 0 80px 0;
  width: 60%;
  @media ${mediaQueries.laptopL} {
    margin: 90px 0 100px 0;
    width: 65%;
  }
`;

export default Logo;
