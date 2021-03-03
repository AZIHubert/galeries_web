import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';
import * as React from 'react';

import ThemeProvider from '#contexts/ThemeContext';

import Pictogram from '../index';

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

const container = 'container';
const hoverPictogram = 'hoverPictogram';
const pictogram = 'pictogram';

const Container = ({
  marginLeft,
  marginRight,
}: {
  marginLeft?: number
  marginRight?: number;
}) => (
  <ThemeProvider>
    <Pictogram
      containerTestId={container}
      hoverPictogram={() => <></>}
      hoverPictogramTestId={hoverPictogram}
      marginLeft={marginLeft}
      marginRight={marginRight}
      pictogram={() => <></>}
      pictogramTestId={pictogram}
    />
  </ThemeProvider>
);

describe('Pictogram', () => {
  afterEach(cleanup);
  it('should display pictogram on mount', () => {
    const {
      getByTestId,
      queryByTestId,
    } = render(<Container />);
    expect(getByTestId(pictogram)).toBeTruthy();
    expect(queryByTestId(hoverPictogram)).toBeFalsy();
  });
  it('should switch pictogram on mouse enter/leave', () => {
    const {
      getByTestId,
      queryByTestId,
    } = render(<Container />);
    fireEvent.mouseEnter(getByTestId(pictogram));
    expect(queryByTestId(pictogram)).toBeFalsy();
    expect(getByTestId(hoverPictogram)).toBeTruthy();
    fireEvent.mouseLeave(getByTestId(hoverPictogram));
    expect(getByTestId(pictogram)).toBeTruthy();
    expect(queryByTestId(hoverPictogram)).toBeFalsy();
  });
  it('should render with default proos', () => {
    const {
      getByTestId,
    } = render(<Container />);
    expect(getByTestId(container)).toHaveStyle('margin: 0px 0px 0px 0px');
  });
  it('should have margin left', () => {
    const {
      getByTestId,
    } = render(
      <Container
        marginLeft={10}
      />,
    );
    expect(getByTestId(container)).toHaveStyle('margin: 0px 0px 0px 10px');
  });
  it('should have margin right', () => {
    const {
      getByTestId,
    } = render(
      <Container
        marginRight={10}
      />,
    );
    expect(getByTestId(container)).toHaveStyle('margin: 0px 10px 0px 0px');
  });
});
