import * as React from 'react';
import { Reset } from 'styled-reset';

import Routes from '#src/Routes';

import ThemeProvider from '#contexts/ThemeContext';
import { UserProvider } from '#contexts/UserContext';

import GlobalStyle from '#helpers/GlobalStyle';

const App = () => (
  <ThemeProvider>
    <UserProvider>
      <GlobalStyle />
      <Reset />
      <Routes />
    </UserProvider>
  </ThemeProvider>
);

export default App;
