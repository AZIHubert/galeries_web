import { cleanup } from '@testing-library/react';
import * as React from 'react';
import ReactRouterDOM from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';

import ThemeProvider from '#contexts/ThemeContext';
import reducers from '#store/reducers';

import Profile from '../index';

const mockedStore = createStore(reducers);

const Container = () => (
  <Provider store={mockedStore}>
    <ThemeProvider>
      <Profile />
    </ThemeProvider>
  </Provider>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as typeof ReactRouterDOM,
  Link: jest.fn(({ children }) => children),
}));
jest.mock('#components/Image', () => ({
  __esModule: true,
  A: true,
  default: () => <div></div>,
}));

describe('Profile', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
