import * as React from 'react';
import { Reset } from 'styled-reset';

import Routes from '#src/Routes';

import ThemeProvider from '#contexts/ThemeContext';
import { UserProvider } from '#contexts/UserContext';
import { LoadingProvider } from '#contexts/LoadingContext';

import GlobalStyle from '#helpers/GlobalStyle';

const App = () => (
  <ThemeProvider>
    <UserProvider>
      <LoadingProvider>
        <GlobalStyle />
        <Reset />
        <Routes />
      </LoadingProvider>
    </UserProvider>
  </ThemeProvider>
);

export default App;
