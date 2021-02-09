import styled from 'styled-components';

interface ContainerI {
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
  left: 50%;
  max-width: 80%;
  max-height: 90vh;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 380px;
  z-index: 1;
`;

export default Container;
