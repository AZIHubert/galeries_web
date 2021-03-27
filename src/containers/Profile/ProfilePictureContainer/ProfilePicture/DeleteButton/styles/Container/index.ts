import styled from 'styled-components';

const Container = styled.button.attrs(() => ({
  className: 'button',
}))`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.danger};
  border: none;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  display: flex;
  height: 25px;
  justify-content: center;
  left: 15px;
  padding: 5px;
  position: absolute;
  top: 15px;
  transition: ${({ theme }) => theme.transition.default};
  width: 25px;
  z-index: 1;
  &:focus {
    outline: none;
  }
`;

export default Container;
