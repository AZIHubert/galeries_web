import styled from 'styled-components';

interface ErrorI {
  testId?: string;
}

const Error = styled.div.attrs<ErrorI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ErrorI>`
  color: ${({ theme }) => theme.colors.danger};
  display: flex;
  font-size: 0.7rem;
  font-style: italic;
  justify-content: flex-end;
`;

export default Error;
