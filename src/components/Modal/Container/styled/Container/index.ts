import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface ContainerI {
  variant?: 'default' | 'danger';
}

const Container = styled.div<ContainerI>`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({
    variant,
    theme,
  }) => (variant === 'danger' ? (
    `4px solid ${theme.colors.danger}`
  ) : 'none')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  z-index: 1;
  @media ${mediaQueries.mobileL} {
    padding: 25px 45px 25px 45px;
  }
  @media ${mediaQueries.laptopL} {
    padding: 35px 40px 35px 40px;
  }
`;

Container.defaultProps = {
  variant: 'default',
};

export default Container;
