import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import {
  Background,
  Container,
  Fader,
} from './styles';

interface ModalI {
  callBack?: () => void;
  children: React.ReactNode;
  containerTestId?: string;
  handleClose: () => void;
  modalTestId?: string;
  open: boolean;
}

const modalRoot = document.getElementById('modal-root');

const Modal = ({
  callBack,
  children,
  containerTestId,
  handleClose,
  modalTestId,
  open,
}: ModalI) => {
  const el = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    if (modalRoot && open) modalRoot.appendChild(el.current);
  }, [open]);

  return (
    ReactDOM.createPortal(
      <CSSTransition
        classNames='fade'
        in={open}
        onExited={() => {
          if (modalRoot) {
            modalRoot.removeChild(el.current);
          }
          if (callBack) callBack();
        }}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <Container
            testId={containerTestId}
          >
            {children}
          </Container>
          <Background
            onClick={handleClose}
            testId={modalTestId}
          />
        </Fader>
      </CSSTransition>,
      el.current,
    )
  );
};

export default Modal;
