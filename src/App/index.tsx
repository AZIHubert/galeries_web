import './App.css';

import * as React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Reset } from 'styled-reset';

import Notification from '#containers/Notification';

import ThemeProvider from '#contexts/ThemeContext';

import GlobalStyle from '#helpers/GlobalStyle';

import Routes from '#src/Routes';

import store from '#store/index';

const App = () => (
  <Provider store={store} >
    <ThemeProvider>
      <Router>
        <GlobalStyle />
        <Reset />
        <Notification />
        <Routes />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;
