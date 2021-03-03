import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const InnerContainer = styled.div`
  border-radius: 50%;
  height: 120px;
  overflow: hidden;
  transition: ${({ theme }) => theme.transition.default};
  width: 120px;
  position: relative;
  @media ${mediaQueries.tablet} {
    height: 160px;
    width: 160px;
  }
  @media ${mediaQueries.laptopL} {
    height: 190px;
    width: 190px;
  }
`;

export default InnerContainer;
