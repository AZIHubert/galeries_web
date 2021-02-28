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
  &.fade-enter {
    opacity: 0;
    & .background-container {
      right: 1px;
      top: 1px;
    }
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
    & .background-container {
      right: 4px;
      top: 4px;
      transition: 400ms;
    }
  }
  &.fade-exit {
    opacity: 1;
    & .background-container {
      right: 4px;
      top: 4px;
    }
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
    & .background-container {
      right: 1px;
      top: 1px;
      transition:  400ms;
    }
  }
  @media ${mediaQueries.laptopL} {
    margin-top: 8px;
    width: 260px;
  }
`;

export default Container;
