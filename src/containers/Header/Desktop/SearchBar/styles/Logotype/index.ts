import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface LogotypeI {
  focused: boolean;
}

const Logotype = styled.img<LogotypeI>`
  margin-right: ${({ focused }) => (focused ? 0 : '8px')};
  transition: ${({ theme }) => (
    `${theme.transition.default}`
  )};
  width: ${({ focused }) => (focused ? 0 : '12px')};
  @media ${mediaQueries.laptopL} {
    margin-right: ${({ focused }) => (focused ? 0 : '10px')};
    width: ${({ focused }) => (focused ? 0 : '16px')};
  }
`;

export default Logotype;
