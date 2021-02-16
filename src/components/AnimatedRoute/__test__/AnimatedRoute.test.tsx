import * as React from 'react';
import {
  Link,
  MemoryRouter,
} from 'react-router-dom';
import {
  fireEvent,
  render,
} from '@testing-library/react';

import AnimatedRoute from '../index';

const Container = () => (
  <MemoryRouter
    initialEntries={['/initialRoute']}
  >
    <AnimatedRoute
      path='/initialRoute'
      testId='initialRoute'
    />
    <AnimatedRoute
      path='/secondRoute'
      testId='secondRoute'
    />
    <Link
      data-testid='link'
      to='/secondRoute'
    />
  </MemoryRouter>
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

describe('AnimatedRoute', () => {
  it('initial route should be render', () => {
    const { getByTestId } = render(<Container />);
    expect(getByTestId('initialRoute')).toBeTruthy();
  });
  it('secondRoute should not be rendered', () => {
    const { queryByTestId } = render(<Container />);
    expect(queryByTestId('secondRoute')).toBeNull();
  });
  it('should switch route without render both', () => {
    const {
      getByTestId,
      queryByTestId,
    } = render(<Container />);
    fireEvent.click(getByTestId('link'));
    expect(getByTestId('secondRoute')).toBeTruthy();
    expect(queryByTestId('initialRoute')).toBeNull();
  });
});
