import { createGlobalStyle } from 'styled-components';

import HelveticaLTStdBold from '#ressources/fonts/HelveticaLTStdBold.ttf';
import HelveticaLTStRoman from '#ressources/fonts/HelveticaLTStdRoman.ttf';
import HelveticaLTStdObl from '#ressources/fonts/HelveticaLTStdObl.ttf';
import HelveticaLTStdLight from '#ressources/fonts/HelveticaLTStdLight.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'HelveticaLTstd';
    font-style: normal;
    font-weight: normal;
    src: url(${HelveticaLTStRoman});
  }
  @font-face {
    font-family: 'HelveticaLTstd';
    font-style: normal;
    font-weight: bold;
    src: url(${HelveticaLTStdBold});
  }
  @font-face {
    font-family: 'HelveticaLTstd';
    font-style: italic;
    font-weight: normal;
    src: url(${HelveticaLTStdObl});
  }
  @font-face {
    font-family: 'HelveticaLTstd';
    font-style: normal;
    font-weight: lighter;
    src: url(${HelveticaLTStdLight});
  }
  body {
    background-color: ${({ theme }) => theme.colors.secondary};
    font-family: 'HelveticaLTstd';
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
