import './App.css';

import * as React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { Reset } from 'styled-reset';

import Notification from '#containers/Notification';

import ThemeProvider from '#contexts/ThemeContext';
import {
  GalerieProvider,
} from '#contexts/galerieContext';

import GlobalStyle from '#helpers/GlobalStyle';

import Routes from '#src/Routes';

import store from '#store/index';

smoothscroll.polyfill();

const App = () => (
  <Provider store={store} >
    <GalerieProvider>
      <ThemeProvider>
        <Router>
          <GlobalStyle />
          <Reset />
          <Notification />
          <Routes />
        </Router>
      </ThemeProvider>
    </GalerieProvider>
  </Provider>
);

export default App;
