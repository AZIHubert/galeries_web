import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface InputI {
  testId?: string;
}

const Input = styled.input.attrs<InputI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<InputI>`
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
