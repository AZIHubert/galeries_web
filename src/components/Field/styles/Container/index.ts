import styled from 'styled-components';

interface ContainerI {
  marginBottom: number;
  marginTop: number;
}

const Container = styled.div<ContainerI>`
  margin: ${({
    marginBottom,
    marginTop,
  }) => (
    `${marginTop}px 0 ${marginBottom}px 0`
  )}
`;

Container.defaultProps = {
  marginBottom: 0,
  marginTop: 0,
};

export default Container;
