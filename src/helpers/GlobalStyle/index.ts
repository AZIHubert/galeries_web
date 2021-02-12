import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  body {
    background-color: ${({ theme }) => theme.colors.secondary};
    font-family: 'HelveticaLTstd';
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
