import styled from 'styled-components';

interface ContainerI {
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: auto;
`;

export default Container;
