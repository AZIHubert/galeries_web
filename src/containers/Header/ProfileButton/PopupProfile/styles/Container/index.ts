import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({ theme }) => (
    `2px solid ${theme.colors.primary}`
  )};
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  position: absolute;
  right: 0px;
  width: 290px;
  &.fade-enter {
    opacity: 0;
    & .background-container {
      right: 2px;
      top: 2px;
    }
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
    & .background-container {
      right: 6px;
      top: 6px;
      transition: 400ms;
    }
  }
  &.fade-exit {
    opacity: 1;
    & .background-container {
      right: 6px;
      top: 6px;
    }
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
    & .background-container {
      right: 2px;
      top: 2px;
      transition:  400ms;
    }
  }
`;

export default Container;
