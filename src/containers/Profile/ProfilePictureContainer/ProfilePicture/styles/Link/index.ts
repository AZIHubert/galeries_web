import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  display: block;
  transition: ${({ theme }) => theme.transition.default};
  &:hover{
    transform: scale(1.05);
  }
`;

export default StyledLink;
