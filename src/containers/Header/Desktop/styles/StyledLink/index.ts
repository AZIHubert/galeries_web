import { Link } from 'react-router-dom';
import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const StyledLink = styled(Link)`
  margin-right: 40px;
  @media ${mediaQueries.laptopL} { 
    margin-right: 50px;
    width: ${({ theme }) => `${theme.header.dashboard.logoWidth.large}px`};
  }
`;

export default StyledLink;
