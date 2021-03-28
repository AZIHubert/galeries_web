import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface MenuI {
  fixed: boolean;
}

const Menu = styled.div<MenuI>`
  align-items: center;
  background-color: ${({
    fixed,
    theme,
  }) => (fixed ? '#f1f1e7' : theme.colors.secondary)};
  display: flex;
  border-bottom: ${({
    fixed,
    theme,
  }) => `2px solid ${fixed ? '#f1f1e7' : theme.colors.primary}`};
  height: 45px;
  justify-content: space-between;
  margin: ${({
    fixed,
    theme,
  }) => `${fixed ? `0 ${theme.wrapper.margin.smallest}px` : 0}`};
  overflow: hidden;
  transition: ${({ theme }) => `background-color ${theme.transition.default}`};
  padding: 0 15px;
  z-index: 100;
  @media ${mediaQueries.mobileL} {
    margin: ${({
    fixed,
    theme,
  }) => `${fixed ? `0 ${theme.wrapper.margin.small}px` : 0}`};
  }
  @media ${mediaQueries.laptop} {
    margin: ${({
    fixed,
    theme,
  }) => `${fixed ? `0 ${theme.wrapper.margin.medium}px` : 0}`};
  }
  @media ${mediaQueries.laptopL} { 
    margin: ${({
    fixed,
    theme,
  }) => `${fixed ? `0 ${theme.wrapper.margin.large}px` : 0}`};
  }
`;

export default Menu;
