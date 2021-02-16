import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-left: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  border-right: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 0.8rem;
  justify-content: center;
  margin-left: 25px;
  min-width: 170px;
  padding: 0 30px;
  &:focus {
    outline: none;
  }
  @media ${mediaQueries.laptopL} {
    font-size: 0.9rem;
    min-width: 190px;
    margin-left: 35px;
  }
`;

export default Button;
