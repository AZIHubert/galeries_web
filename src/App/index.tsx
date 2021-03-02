import './App.css';

import * as React from 'react';
import { Provider } from 'react-redux';
import { Reset } from 'styled-reset';

import ThemeProvider from '#contexts/ThemeContext';

import GlobalStyle from '#helpers/GlobalStyle';

import Routes from '#src/Routes';

import store from '#store/index';

import Notification from '#containers/Notification';

const App = () => (
  <Provider store={store} >
    <ThemeProvider>
      <GlobalStyle />
      <Reset />
      <Notification />
      <Routes />
    </ThemeProvider>
  </Provider>
);

export default App;

/*
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imaginez un sélecteur de dates {props.color} ici.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
*/
