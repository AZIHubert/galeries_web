import styled from 'styled-components';
import mediaQueries from '#helpers/mediaQueries';

const Logo = styled.img`
  width: ${({ theme }) => (
    `${theme.header.home.logoWidth.medium}px`
  )};
  @media ${mediaQueries.laptopL} { 
    width: ${({ theme }) => (
    `${theme.header.home.logoWidth.large}px`
  )};
  }
`;

export default Logo;
