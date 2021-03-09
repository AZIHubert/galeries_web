import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  bottom: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  display: flex;
  height: 32px;
  padding: 10px;
  position: fixed;
  right: 25px;
  width: 32px;
  &:focus {
    outline: none;
  }
  @media ${mediaQueries.tablet} {
    bottom: 30px;
    right: 30px;
  }
  @media ${mediaQueries.laptopL} {
    bottom: 40px;
    height: 38px;
    padding: 12px;
    right: 40px;
    width: 38px;
  }
`;

export default Button;
