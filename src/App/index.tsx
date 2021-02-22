import './App.css';

import * as React from 'react';
import { Provider } from 'react-redux';
import { Reset } from 'styled-reset';

import Routes from '#src/Routes';

import ThemeProvider from '#contexts/ThemeContext';

import GlobalStyle from '#helpers/GlobalStyle';

import store from '#store/index';

const App = () => (
  <Provider store={store} >
    <ThemeProvider>
      <GlobalStyle />
      <Reset />
      <Routes />
    </ThemeProvider>
  </Provider>
);

export default App;
