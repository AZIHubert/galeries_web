import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Logo = styled.img`
  margin-right: 40px;
  width: ${({ theme }) => `${theme.header.dashboard.logoWidth.medium}px`};
  @media ${mediaQueries.laptopL} { 
    margin-right: 50px;
    width: ${({ theme }) => `${theme.header.dashboard.logoWidth.large}px`};
  }
`;

export default Logo;
