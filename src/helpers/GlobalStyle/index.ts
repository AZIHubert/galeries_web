import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  body {
    background-color: ${({ theme }) => theme.colors.secondary};
    font-family: 'HelveticaLTstd';
  }
  .sortableHelper {
    z-index: 200;
  }
`;

export default GlobalStyle;
