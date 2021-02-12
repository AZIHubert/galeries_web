import styled from 'styled-components';

const NavLink = styled.div`
  border-top: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  margin-top: 40px;
  padding-top: 20px;
  text-align: right;
  width: 100%;
  & > a {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.8rem;
    padding: 4px 6px;
    text-decoration: none;
    transition: color 400ms;
    &:hover {
      color: ${({ theme }) => theme.colors.black}
    }
  }
`;

export default NavLink;
