import * as React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import ThemeProvider from '#contexts/ThemeContext';

import Modal from '../index';

interface ContainerI {
  initialOpen: boolean
}

const innerText = 'Hello world';
const openButtonText = 'open modal';

const Container = ({ initialOpen }: ContainerI) => {
  const [open, setOpen] = React.useState<boolean>(initialOpen);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider>
      <button
        onClick={() => setOpen(true)}
      >
        {openButtonText}
      </button>
      <Modal
        open={open}
        handleClose={handleClose}
        testId='modal'
      >
        <div>{innerText}</div>
      </Modal>
    </ThemeProvider>
  );
};

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

describe('Modal', () => {
  beforeAll(() => {
    // @ts-ignore
    ReactDOM.createPortal = jest.fn((element) => element);
  });
  afterEach(() => {
    // @ts-ignore
    ReactDOM.createPortal.mockClear();
  });
  const handleClose = jest.fn;
  it('renders without crashing', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <Modal open={true} handleClose={handleClose}>
          <div />
        </Modal>
      </ThemeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe('when open start at true', () => {
    let child: HTMLElement;
    let modal: HTMLElement;
    let modalBackground: HTMLElement;
    beforeEach(() => {
      const { getByTestId, getByText } = render(<Container initialOpen={true} />);
      child = getByText(innerText);
      modal = getByTestId('modal');
      modalBackground = getByTestId('modalBackground');
    });
    it('should be open', () => {
      expect(child).not.toBeNull();
      expect(modal).not.toBeNull();
      expect(modalBackground).not.toBeNull();
    });
    it('should close when clicking on background', () => {
      fireEvent.click(modalBackground);
      const childAfterClose = screen.queryByTestId(innerText);
      const modalAfterClose = screen.queryByTestId('modalBackground');
      const modalBackgroundAfterClose = screen.queryByTestId('modalBackground');
      expect(childAfterClose).toBeNull();
      expect(modalAfterClose).toBeNull();
      expect(modalBackgroundAfterClose).toBeNull();
    });
  });
  describe('When open start to false', () => {
    let child: HTMLElement | null;
    let modal: HTMLElement | null;
    let modalBackground: HTMLElement | null;
    let openButton: HTMLElement;
    beforeEach(() => {
      const { getByText, queryByTestId, queryByText } = render(<Container initialOpen={false} />);
      child = queryByText(innerText);
      modal = queryByTestId('modal');
      modalBackground = queryByTestId('modalBackground');
      openButton = getByText(openButtonText);
    });
    it('should be close', () => {
      expect(child).toBeNull();
      expect(modal).toBeNull();
      expect(modalBackground).toBeNull();
    });
    it('should open when open is set to true', async () => {
      fireEvent.click(openButton);
      const childAfterOpen = await screen.findByText(innerText);
      const modalAfterOpen = await screen.findByTestId('modal');
      const modalBackgroundAfterOpen = await screen.findByTestId('modal');
      expect(childAfterOpen).not.toBeNull();
      expect(modalAfterOpen).not.toBeNull();
      expect(modalBackgroundAfterOpen).not.toBeNull();
    });
  });
});
