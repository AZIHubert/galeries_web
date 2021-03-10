import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface InnerContainerI {
  variant?: 'default' | 'danger';
}

const InnerContainer = styled.div<InnerContainerI>`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({
    variant,
    theme,
  }) => (
    `4px solid ${variant === 'default' ? theme.colors.primary : theme.colors.danger}`
  )};
  border-radius: 20px 0;
  display: flex;
  flex-direction: column;
  padding: 25px 25px 15px 25px;
  z-index: 1;
  @media ${mediaQueries.mobileL} {
    padding: 25px 45px 15px 45px;
  }
  @media ${mediaQueries.laptopL} {
    padding: 35px 40px 25px 40px;
  }
`;

InnerContainer.defaultProps = {
  variant: 'default',
};

export default InnerContainer;
