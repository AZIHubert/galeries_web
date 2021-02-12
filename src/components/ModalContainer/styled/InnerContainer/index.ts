import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const InnerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({ theme }) => (
    `4px solid ${theme.colors.primary}`
  )};
  border-radius: 20px 0;
  display: flex;
  flex-direction: column;
  padding: 25px 25px 15px 25px;
  z-index: 1;
  @media ${mediaQueries.mobileL} {
    padding: 25px 45px 15px 45px;
  }
`;

export default InnerContainer;
