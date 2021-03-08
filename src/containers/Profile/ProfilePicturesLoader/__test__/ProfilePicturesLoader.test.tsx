import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { profilePicturesStatusSelector } from '#store/selectors';

import ThemeProvider from '#contexts/ThemeContext';

import reducers from '#store/reducers';

import ProfilePicturesLoader from '../index';

const container = 'container';

const mockedReducer = createStore(reducers);

const Container = () => (
  <Provider store={mockedReducer}>
    <ThemeProvider>
      <ProfilePicturesLoader />
    </ThemeProvider>
  </Provider>
);

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn((props) => (
    props.in ? (
      <FakeTransition>
        {props.children}
      </FakeTransition>
    ) : null));
  return {
    CSSTransition: FakeCSSTransition,
    Transition: FakeTransition,
  };
});

jest.mock('#store/selectors/profilePicturesStatus.selector', () => jest.fn());

describe('ProfilePicturesLoader', () => {
  it('should display DotLoader if is posting', () => {
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'fetching');
    const { getByTestId } = render(<Container />);
    expect(getByTestId(container)).toBeTruthy();
  });
  it('should not display DotLoader if is not posting', () => {
    (profilePicturesStatusSelector as jest.Mock).mockImplementation(() => 'pending');
    const { queryByTestId } = render(<Container />);
    expect(queryByTestId(container)).toBeFalsy();
  });
});
