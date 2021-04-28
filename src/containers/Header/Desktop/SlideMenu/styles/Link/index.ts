import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const CustomLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  transition: ${({ theme }) => theme.transition.default};
  &.active {
    color: ${({ theme }) => theme.colors.black};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default CustomLink;
