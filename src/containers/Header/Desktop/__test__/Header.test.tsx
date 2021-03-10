import { cleanup } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import ReactRouterDOM from 'react-router-dom';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import reducers from '#store/reducers';

import Header from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  </Provider>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDOM,
  Link: jest.fn(({ children }) => children),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
}));

describe('Header', () => {
  afterEach(cleanup);
  describe('Desktop', () => {
    it('renders without crashing', () => {
      const tree = renderer.create(<Container />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
