import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ModalI {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.getElementById('modal-root');

const PopupLogin = ({ children, open, handleClose }: ModalI) => {
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
        <div
          data-testid="modal"
        >
          {children}
        </div>
        <div
          data-testid="modalBackground"
          onClick={handleClose}
        >
        </div>
      </>,
      el.current,
    )
  );
};

export default PopupLogin;
