import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

type Variant = 'danger' | 'primary';

interface ContainerI {
  testId?: string;
  variant?: Variant;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
  background-color: ${({
    theme,
    variant,
  }) => (
    variant === 'primary' ? theme.colors.primary : theme.colors.danger
  )};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({
    theme,
    variant,
  }) => (
    variant === 'primary' ? theme.colors.secondary : theme.colors.white
  )};
  font-size: 0.85rem;
  padding: 6px 12px;
  text-align: center;
  width: 90%;
  @media ${mediaQueries.mobileL} {
    width: auto;
  }
  @media ${mediaQueries.laptopL} {
    font-size: 1rem;
    padding: 8px 14px;
    top: 20px;
  }
`;

Container.defaultProps = {
  variant: 'primary',
};

export default Container;
