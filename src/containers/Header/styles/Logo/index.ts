import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Logo = styled.img`
  margin-right: 40px;
  width: 22px;
  @media ${mediaQueries.laptopL} { 
    margin-right: 50px;
    width: 30px;
  }
`;

export default Logo;
