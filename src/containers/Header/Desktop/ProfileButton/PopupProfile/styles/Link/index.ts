import { Link } from 'react-router-dom';
import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface LinkI {
  borderBottom?: boolean;
  testId?: string;
}

const StyledLink = styled(Link).attrs<LinkI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<LinkI>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-bottom: ${({
    borderBottom,
    theme,
  }) => (
    borderBottom && `1px solid ${theme.colors.primary}`
  )};
  display: flex;
  cursor: pointer;
  height: 50px;
  padding: 10px 3px;
  width: 100%;
  &:focus {
    outline: none;
  }
  @media ${mediaQueries.laptopL} {
    height: 65px;
  }
`;

StyledLink.defaultProps = {
  borderBottom: false,
};

export default StyledLink;
