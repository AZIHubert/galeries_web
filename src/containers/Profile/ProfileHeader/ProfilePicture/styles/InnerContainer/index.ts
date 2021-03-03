import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface InnerContainerI {
  isPending?: boolean;
}

const InnerContainer = styled.div<InnerContainerI>`
  border-radius: 50%;
  height: 120px;
  opacity: ${({ isPending }) => (isPending ? 0.25 : 1)};
  overflow: hidden;
  transition: ${({ theme }) => theme.transition.default};
  width: 120px;
  @media ${mediaQueries.tablet} {
    height: 160px;
    width: 160px;
  }
  @media ${mediaQueries.laptopL} {
    height: 190px;
    width: 190px;
  }
`;

InnerContainer.defaultProps = {
  isPending: false,
};

export default InnerContainer;
