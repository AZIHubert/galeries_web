import { cleanup } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import reducers from '#store/reducers';

import Desktop from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <Desktop />
    </ThemeProvider>
  </Provider>

);

describe('Desktop', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
