import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  Background,
  Container,
} from './styles';

interface ModalI {
  children: React.ReactNode;
  handleClose: () => void;
  open: boolean;
}

const modalRoot = document.getElementById('modal-root');

const Modal = ({
  children,
  handleClose,
  open,
}: ModalI) => {
  const el = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    if (modalRoot && open) {
      modalRoot.appendChild(el.current);
    }
    return () => {
      if (modalRoot && open) {
        modalRoot.removeChild(el.current);
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    ReactDOM.createPortal(
      <>
        <Container
          data-testid="modal"
        >
          {children}
        </Container>
        <Background
          data-testid="modalBackground"
          onClick={handleClose}
        />
      </>,
      el.current,
    )
  );
};

export default Modal;
