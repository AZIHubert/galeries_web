import styled from 'styled-components';

interface SearchBarI {
  focused?: boolean;
}

const Container = styled.div<SearchBarI>`
  background-color: #a1a1a1;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: text;
  display: flex;
  height: 24px;
  opacity: ${({ focused }) => (focused ? 0.6 : 0.3)};
  padding: 4px 13px;
  transition: ${({ theme }) => (
    `opacity ${theme.transition.default} ease-in`
  )};
  width: 250px;
`;

Container.defaultProps = {
  focused: false,
};

export default Container;
