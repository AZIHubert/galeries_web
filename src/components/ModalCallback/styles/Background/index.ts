import styled from 'styled-components';

type Variant = 'error' | 'primary';

interface BackgroundI {
  variant?: Variant;
}

const Background = styled.div.attrs(() => ({
  className: 'background-container',
}))<BackgroundI>`
  background-color: ${({
    theme,
    variant,
  }) => (
    variant === 'primary' ? theme.colors.primary : theme.colors.danger
  )};
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 100%;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 100%;
`;

Background.defaultProps = {
  variant: 'primary',
};

export default Background;
