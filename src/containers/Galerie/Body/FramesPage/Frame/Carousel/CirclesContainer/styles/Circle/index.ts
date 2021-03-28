import styled from 'styled-components';

interface CircleI {
  current: boolean;
}

const Circle = styled.button<CircleI>`
  background-color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 8px;
  margin: 0 2px 5px 2px;
  opacity: ${({ current }) => (current ? 0.75 : 0.5)};
  padding: 0;
  transition: ${({ theme }) => theme.transition.default};
  transform: ${({ current }) => (current ? 'scale(1.25)' : 'scale(1)')};
  width: 8px;
  &:focus {
    outline: none;
  }
`;

export default Circle;
