import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface SearchBarI {
  focused?: boolean;
  testId?: string;
}

const Container = styled.div.attrs<SearchBarI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<SearchBarI>`
  background-color: #a1a1a1;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: text;
  display: flex;
  height: 20px;
  opacity: ${({ focused }) => (focused ? 0.6 : 0.3)};
  padding: 2px 11px;
  transition: ${({ theme }) => (
    `opacity ${theme.transition.default} ease-in`
  )};
  width: 220px;
  @media ${mediaQueries.laptopL} {
    border-radius: 12px;
    height: 24px;
    padding: 4px 11px;
    width: 250px;
  }
`;

Container.defaultProps = {
  focused: false,
};

export default Container;
