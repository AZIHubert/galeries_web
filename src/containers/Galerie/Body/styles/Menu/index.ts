import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface MenuI {
  fixed: boolean;
}

const Container = styled.header<MenuI>`
  background-color: ${({ theme }) => theme.colors.secondary};
  left: 0;
  position: ${({ fixed }) => (fixed ? 'fixed' : 'static')};
  top: ${({ theme }) => `${theme.header.dashboard.height.small}px`};
  width: 100%;
  z-index: 10;
  @media ${mediaQueries.laptop} {
    top: ${({ theme }) => `${theme.header.dashboard.height.medium}px`};
  }
  @media ${mediaQueries.laptopL} { 
    top: ${({ theme }) => `${theme.header.dashboard.height.large}px`};
  }
`;

export default Container;
