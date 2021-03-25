import styled from 'styled-components';

interface ButtonMenuI {
  margin?: boolean;
  current: boolean;
}

const ButtonMenu = styled.button<ButtonMenuI>`
  font-size: 0.85rem;
  cursor: pointer;
  color: ${({
    current,
    theme,
  }) => (current ? theme.colors.primary : theme.colors.black)};
  background-color: transparent;
  padding: 0;
  border: none;
  margin-right: ${({ margin }) => (margin ? '10px' : 0)};
  &:focus{
    outline: none;
  }
`;

ButtonMenu.defaultProps = {
  margin: false,
  current: false,
};

export default ButtonMenu;
