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
  handleClose: () => void;
  open: boolean;
}

const modalRoot = document.getElementById('modal-root');

const Modal = ({
  callBack,
  children,
  handleClose,
  open,
}: ModalI) => {
  const el = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    if (modalRoot && open) {
      modalRoot.appendChild(el.current);
    }
  }, [open]);

  return (
    ReactDOM.createPortal(
      <CSSTransition
        onExited={() => {
          if (modalRoot) {
            modalRoot.removeChild(el.current);
          }
          if (callBack) callBack();
        }}
        in={open}
        classNames='fade'
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <Container
            testId="modal"
          >
            {children}
          </Container>
          <Background
            onClick={handleClose}
            testId="modalBackground"
          />
        </Fader>
      </CSSTransition>,
      el.current,
    )
  );
};

export default Modal;
