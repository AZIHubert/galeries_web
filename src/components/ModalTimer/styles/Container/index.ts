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
  left: 50%;
  padding: 6px 12px;
  position: absolute;
  text-align: center;
  top: 14px;
  transform: translateX(-50%);
  width: 90%;
  z-index: 10;
  @media ${mediaQueries.mobileL} {
    width: auto;
  }
`;

Container.defaultProps = {
  variant: 'primary',
};

export default Container;
