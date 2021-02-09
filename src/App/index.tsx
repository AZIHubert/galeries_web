import * as React from 'react';
import { Reset } from 'styled-reset';

import Home from '#containers/Home';

import ThemeProvider from '#contexts/ThemeContext';
import { UserProvider } from '#contexts/UserContext';

import GlobalStyle from '#helpers/GlobalStyle';

const App = () => (
  <ThemeProvider>
    <UserProvider>
      <GlobalStyle />
      <Reset />
      <Home />
    </UserProvider>
  </ThemeProvider>
);

export default App;
