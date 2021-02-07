import * as React from 'react';
import { Reset } from 'styled-reset';

import Home from '#containers/Home';

import { UserProvider } from '#contexts/UserContext';

const App = () => (
  <UserProvider>
    <Reset />
    <Home />
  </UserProvider>
);

export default App;
