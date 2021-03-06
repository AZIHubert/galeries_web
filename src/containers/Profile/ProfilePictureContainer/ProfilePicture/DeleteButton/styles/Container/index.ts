import styled from 'styled-components';

const Container = styled.button.attrs(() => ({
  className: 'button',
}))`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.danger};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxShadow};
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
`;

export default Container;
