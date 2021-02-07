import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

interface ModalI {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.getElementById('modal-root');

const Background = styled.div`
  background-color: #000;
  height: 100vh;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100%;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  max-width: 80%;
  width: 560px;
  max-height: 90vh;

`;

const Modal = ({ children, open, handleClose }: ModalI) => {
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
        <ModalContainer
          data-testid="modal"
        >
          {children}
        </ModalContainer>
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
