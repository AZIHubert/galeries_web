import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Title = styled.h2`
  border-bottom: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 40px;
  padding-bottom: 10px;
  width: 100%;
  @media ${mediaQueries.laptopL} {
    font-size: 1.6rem;
    padding-bottom: 15px;
    border-width: 2px;
  }
`;

export default Title;
