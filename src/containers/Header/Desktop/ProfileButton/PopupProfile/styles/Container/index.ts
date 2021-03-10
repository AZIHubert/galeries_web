import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  position: absolute;
  right: 0px;
  width: 220px;
  @media ${mediaQueries.laptopL} {
    margin-top: 8px;
    width: 260px;
  }
`;

export default Container;
