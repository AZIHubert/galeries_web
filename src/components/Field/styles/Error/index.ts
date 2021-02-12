import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

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
  text-align: right;
  @media ${mediaQueries.laptopL} {
    font-size: 0.8rem;
  }
`;

export default Error;
