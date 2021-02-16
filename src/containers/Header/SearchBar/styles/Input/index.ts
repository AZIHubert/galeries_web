import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  flex-grow: 1;
  font-size: 0.7rem;
  &:focus {
    outline: none;
  }
  &::placeholder{
    color: ${({ theme }) => theme.colors.secondary};
    font-style: italic;
  }
  @media ${mediaQueries.laptopL} {
    font-size: 1rem;
  }
`;

export default Input;
