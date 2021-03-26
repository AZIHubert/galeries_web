import styled from 'styled-components';

interface BackgroundI {
  variant?: 'default' | 'danger';
}

const Background = styled.div.attrs<BackgroundI>(() => ({
  className: 'background-container',
}))<BackgroundI>`
  /* border: ${({
    variant,
    theme,
  }) => (
    variant === 'default' ? `2px solid ${theme.colors.secondary}` : theme.colors.danger
  )};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 100%;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 100%; */
`;

Background.defaultProps = {
  variant: 'default',
};

export default Background;
