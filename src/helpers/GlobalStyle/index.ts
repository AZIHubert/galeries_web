import { createGlobalStyle } from 'styled-components';

import HelveticaLTStdBold from '#ressources/fonts/HelveticaLTStdBold.ttf';
import HelveticaLTStRoman from '#ressources/fonts/HelveticaLTStdRoman.ttf';
import HelveticaLTStdObl from '#ressources/fonts/HelveticaLTStdObl.ttf';
import HelveticaLTStdLight from '#ressources/fonts/HelveticaLTStdLight.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'HelveticaLTstd';
    src: url(${HelveticaLTStRoman});
    font-style: normal;
    font-weight: normal;
  }
  @font-face {
    font-family: 'HelveticaLTstd';
    src: url(${HelveticaLTStdBold});
    font-style: normal;
    font-weight: bold;
  }
  @font-face {
    font-family: 'HelveticaLTstd';
    src: url(${HelveticaLTStdObl});
    font-style: italic;
    font-weight: normal;
  }
  @font-face {
    font-family: 'HelveticaLTstd';
    src: url(${HelveticaLTStdLight});
    font-style: normal;
    font-weight: lighter;
  }
  body {
    font-family: 'HelveticaLTstd';
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
