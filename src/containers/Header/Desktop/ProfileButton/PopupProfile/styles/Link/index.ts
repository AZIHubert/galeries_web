import { Link } from 'react-router-dom';
import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface LinkI {
  testId?: string;
}

const StyledLink = styled(Link).attrs<LinkI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<LinkI>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 50px;
  width: 100%;
  &:focus {
    outline: none;
  }
  @media ${mediaQueries.laptopL} {
    height: 65px;
  }
`;

export default StyledLink;
