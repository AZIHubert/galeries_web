import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Container = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  background-image: ${({ theme }) => (
    `linear-gradient(90deg, ${theme.colors.tertiary} 0%, ${theme.colors.primary} 50%)`
  )};
  border-radius: 50%;
  display: flex;
  height: 128px;
  justify-content: center;
  width: 128px;
  @media ${mediaQueries.tablet} {
    height: 168px;
    margin-right: 90px;
    width: 168px;
  }
  @media ${mediaQueries.laptop} {
    height: 168px;
    width: 168px;
  }
  @media ${mediaQueries.laptopL} {
    height: 200px;
    width: 200px;
  }
`;

export default Container;
