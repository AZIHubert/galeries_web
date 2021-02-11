import styled from 'styled-components';

type Variant = 'error' | 'primary';

interface InnerContainerI {
  variant?: Variant
}

const InnerContainer = styled.div<InnerContainerI>`
  background-color: #FFFFF4;
  border: ${({
    variant,
    theme,
  }) => (
    `3px solid ${variant === 'primary' ? theme.colors.primary : theme.colors.danger}`
  )};
  color: ${({
    variant,
    theme,
  }) => (
    variant === 'primary' ? theme.colors.primary : theme.colors.danger
  )};
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 35px 20px;
  text-align: center;
  z-index: 1;
`;

InnerContainer.defaultProps = {
  variant: 'primary',
};

export default InnerContainer;
