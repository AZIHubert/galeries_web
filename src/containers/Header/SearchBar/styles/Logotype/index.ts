import styled from 'styled-components';

interface LogotypeI {
  focused: boolean;
}

const Logotype = styled.img<LogotypeI>`
  margin-right: ${({ focused }) => (focused ? 0 : '10px')};
  transition: ${({ theme }) => (
    `${theme.transition.default}`
  )};
  width: ${({ focused }) => (focused ? 0 : '15px')};
`;

export default Logotype;
