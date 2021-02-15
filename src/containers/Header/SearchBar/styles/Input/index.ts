import styled from 'styled-components';

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  flex-grow: 1;
  &:focus {
    outline: none;
  }
  &::placeholder{
    color: ${({ theme }) => theme.colors.secondary};
    font-style: italic;
  }
`;

export default Input;
