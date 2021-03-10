import styled from 'styled-components';

interface BackgroundI {
  variant?: 'default' | 'danger';
}

const Background = styled.div.attrs<BackgroundI>(() => ({
  className: 'background-container',
}))<BackgroundI>`
  background-color: ${({
    variant,
    theme,
  }) => (
    variant === 'default' ? theme.colors.primary : theme.colors.danger
  )};
  border-radius: 20px 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 100%;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 100%;
`;

Background.defaultProps = {
  variant: 'default',
};

export default Background;
