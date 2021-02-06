import * as React from 'react';

import Home from '#containers/Home';

import { UserProvider } from '#contexts/UserContext';

const App = () => (
  <UserProvider>
    <Home />
  </UserProvider>
);

export default App;
