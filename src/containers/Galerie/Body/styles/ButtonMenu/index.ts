import styled from 'styled-components';

interface ButtonMenuI {
  margin?: boolean;
  current: boolean;
}

const ButtonMenu = styled.button<ButtonMenuI>`
  font-size: 0.85rem;
  color: ${({
    current,
    theme,
  }) => (current ? theme.colors.primary : theme.colors.black)};
  margin-right: ${({ margin }) => (margin ? '10px' : 0)};
`;

ButtonMenu.defaultProps = {
  margin: false,
  current: false,
};

export default ButtonMenu;
