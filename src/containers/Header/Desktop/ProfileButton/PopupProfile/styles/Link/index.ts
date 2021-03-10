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
  align-items: center;
  background-color: transparent;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  cursor: pointer;
  display: flex;
  height: 50px;
  width: 100%;
  &:focus {
    outline: none;
  }
  @media ${mediaQueries.laptopL} {
    height: 62px;
  }
`;

export default StyledLink;
