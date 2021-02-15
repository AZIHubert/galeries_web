import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface TextAreaI {
  disabled?: boolean;
  error?: boolean;
  testId?: string;
}

const TextArea = styled.textarea.attrs<TextAreaI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<TextAreaI>`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({
    error,
    theme,
  }) => (
    `2px solid ${error ? theme.colors.danger : theme.colors.primary}`
  )};
  color: ${({ theme }) => theme.colors.black};
  font-family: 'HelveticaLTstd';
  height: 100px;
  margin-bottom: 2px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  padding: 5px 10px;
  resize: none;
  transition: ${({ theme }) => `border-left ${theme.transition.default} ease-in-out`};
  width: 100%;
  &:focus {
    border-left: ${({
    error,
    theme,
  }) => `5px solid ${error ? theme.colors.danger : theme.colors.primary}`};
    outline: none;
  }
  &::selection {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};
  }
  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.white};
    border-left: ${({
    error,
    theme,
  }) => (
    `1px solid ${error ? theme.colors.danger : theme.colors.primary}`
  )};
    transition: ${({ theme }) => `border-left ${theme.transition.default} ease-in-out`};
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({
    error,
    theme,
  }) => (error ? theme.colors.danger : theme.colors.primary)};
    transition: ${({ theme }) => `background-color ${theme.transition.default} ease-in-out`};
  }
  @media ${mediaQueries.laptopL} {
    font-size: 1.02rem;
    height: 150px;
    padding: 7px 10px;
  }
`;

export default TextArea;
