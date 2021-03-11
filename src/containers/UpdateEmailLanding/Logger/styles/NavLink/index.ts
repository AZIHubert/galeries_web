import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const NavLink = styled.div`
  border-top: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  margin: 40px 0;
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
  @media ${mediaQueries.laptopL} {
    border-width: 2px;
    padding-top: 40px;
    & > a {
      font-size: 0.9rem;
    }
  }
`;

export default NavLink;
