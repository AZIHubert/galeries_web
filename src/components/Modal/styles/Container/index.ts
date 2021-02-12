import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

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
  @media ${mediaQueries.laptopL} {
    width: 420px;
  }
`;

export default Container;
