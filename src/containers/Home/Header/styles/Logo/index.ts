import styled from 'styled-components';
import mediaQueries from '#helpers/mediaQueries';

const Logo = styled.img`
  width: ${({ theme }) => (
    `${theme.header.logoWidth.medium}px`
  )};
  @media ${mediaQueries.laptopL} { 
    width: ${({ theme }) => (
    `${theme.header.logoWidth.large}px`
  )};
  }
`;

export default Logo;
