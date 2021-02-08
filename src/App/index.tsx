import * as React from 'react';
import { Reset } from 'styled-reset';
import GlobalStyle from '#helpers/GlobalStyle';

import Home from '#containers/Home';

import { UserProvider } from '#contexts/UserContext';
import ThemeProvider from '#contexts/ThemeContext';

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
