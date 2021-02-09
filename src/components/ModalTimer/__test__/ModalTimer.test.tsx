import {
  act,
  render,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import ThemeProvider from '#contexts/ThemeContext';

import ModalTimer from '../index';

const Container = ({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = React.useState<boolean>(defaultOpen);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider>
      <ModalTimer
        handleClose={handleClose}
        open={open}
        text='text'
        testId='modal'
      />
    </ThemeProvider>
  );
};

jest.useFakeTimers();

describe('Desktop', () => {
  const MockedHandleClose = jest.fn;
  beforeEach(() => {
  });
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
    // jest.runOnlyPendingTimers();
    // jest.useRealTimers();
  });
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <ModalTimer
          handleClose={MockedHandleClose}
          open={true}
          text='render text'
        />
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render if open is true', () => {
    act(() => {
      render(
        <Container
          defaultOpen={true}
        />,
      );
    });
    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeNull();
  });
  it('should not render if open is false', () => {
    act(() => {
      render(
        <Container />,
      );
    });
    const modal = screen.queryByTestId('modal');
    expect(modal).toBeNull();
  });
  it('should unmout after 3 second', () => {
    act(() => {
      render(
        <Container
          defaultOpen={true}
        />,
      );
    });
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    const modalOpen = screen.queryByTestId('modal');
    expect(modalOpen).not.toBeNull();
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    const modalClose = screen.queryByTestId('modal');
    expect(modalClose).toBeNull();
  });
});
