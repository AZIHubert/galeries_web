import styled from 'styled-components';

interface InnerContainerI {
  testId?: string;
}

const InnerContainer = styled.div.attrs<InnerContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<InnerContainerI>`
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
  }
`;

export default InnerContainer;
