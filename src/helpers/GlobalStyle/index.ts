import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${({ theme }) => theme.colors.secondary};
    font-family: 'HelveticaLTstd';
  }
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
