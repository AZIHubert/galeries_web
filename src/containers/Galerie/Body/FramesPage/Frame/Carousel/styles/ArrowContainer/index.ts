import styled from 'styled-components';

interface ArrowContainerI {
  variant?: 'left' | 'right';
}

const ArrowContainer = styled.button.attrs(
  () => ({
    className: 'arrow',
  }),
)<ArrowContainerI>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  left: ${({ variant }) => (variant === 'left' ? '10px' : 'auto')};
  opacity: 0;
  padding: 0;
  position: absolute;
  right: ${({ variant }) => (variant === 'right' ? '10px' : 'auto')};
  top: 50%;
  transform: translateY(-50%);
  transition: ${({ theme }) => `opacity ${theme.transition.default}`};
  width: 24px;
  &:focus {
    outline: none;
  }
`;

ArrowContainer.defaultProps = {
  variant: 'left',
};

export default ArrowContainer;
