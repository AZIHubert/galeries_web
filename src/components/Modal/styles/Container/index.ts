import styled from 'styled-components';

interface ContainerI {
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    className: 'modal',
    'data-testid': testId,
  }),
)<ContainerI>`
  left: 50%;
  max-height: 90vh;
  max-width: 80%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  width: 380px;
  z-index: 1;
`;

export default Container;
