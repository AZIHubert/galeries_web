import styled from 'styled-components';

interface ContainerI {
  uri?: string;
}

const Container = styled.div<ContainerI>`
  background-image: ${({ uri }) => (
    uri ? `url("${uri}")` : 'none'
  )};
  background-color: ${({
    theme,
    uri,
  }) => (
    uri ? theme.colors.secondary : 'none'
  )};
`;

export default Container;
