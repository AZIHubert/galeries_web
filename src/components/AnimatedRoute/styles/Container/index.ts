import styled from 'styled-components';

interface ContainerI {
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
  left: 0;
  position: absolute;
  right: 0;
`;

export default Container;
