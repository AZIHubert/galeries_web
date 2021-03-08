import styled from 'styled-components';

interface ContainerI {
  current: boolean;
}

const Container = styled.button.attrs<ContainerI>(
  () => ({
    className: 'button',
  }),
)<ContainerI>`
  background-color: ${({
    current,
    theme,
  }) => (
    current ? theme.colors.primary : theme.colors.secondary
  )};
  border: none;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  height: 25px;
  position: absolute;
  right: 20px;
  top: 20px;
  transition: ${({ theme }) => theme.transition.default};
  width: 25px;
  z-index: 1;
  &:focus {
    outline: none;
  }
`;

Container.defaultProps = {
  current: false,
};

export default Container;
