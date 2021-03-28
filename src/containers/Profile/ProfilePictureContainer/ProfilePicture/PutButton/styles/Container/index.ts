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
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 25px;
  position: absolute;
  right: 15px;
  top: 15px;
  transition: ${({ theme }) => theme.transition.default};
  width: 25px;
  z-index: 1;
`;

Container.defaultProps = {
  current: false,
};

export default Container;
