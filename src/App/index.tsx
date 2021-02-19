import './App.css';

import * as React from 'react';
import { Provider } from 'react-redux';
import { Reset } from 'styled-reset';

import Routes from '#src/Routes';

import { LoadingProvider } from '#contexts/LoadingContext';
import ThemeProvider from '#contexts/ThemeContext';
import { UserProvider } from '#contexts/UserContext';

import GlobalStyle from '#helpers/GlobalStyle';

import store from '#store/index';

const App = () => (
  <Provider store={store} >
    <ThemeProvider>
      <UserProvider>
        <LoadingProvider>
          <GlobalStyle />
          <Reset />
          <Routes />
        </LoadingProvider>
      </UserProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
