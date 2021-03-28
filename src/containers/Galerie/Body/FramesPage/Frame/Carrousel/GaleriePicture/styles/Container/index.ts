import styled from 'styled-components';

interface ContainerI {
  left: number;
}

const Container = styled.li<ContainerI>`
  background-color: ${({ theme }) => theme.colors.tertiary};
  height: 100%;
  left: ${({ left }) => `${left}px`};
  position: absolute;
  top: 0;
  width: 100%;
`;

export default Container;
