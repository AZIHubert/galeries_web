import styled from 'styled-components';

interface ArrowContainerI {
  variant?: 'left' | 'right';
}

const ArrowContainer = styled.div.attrs(
  () => ({
    className: 'arrow',
  }),
)<ArrowContainerI>`
  left: ${({ variant }) => (variant === 'left' ? 0 : 'auto')};
  position: absolute;
  right: ${({ variant }) => (variant === 'right' ? 0 : 'auto')};
  top: 50%;
  transform: translateY(-50%);
  transition: ${({ theme }) => `opacity ${theme.transition.default}`};
  opacity: 0;
`;

ArrowContainer.defaultProps = {
  variant: 'left',
};

export default ArrowContainer;
