import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ModalI {
  open: boolean;
  handleClose: () => void;
}

const modalRoot = document.getElementById('modal-root');

const PopupLogin : React.FunctionComponent<ModalI> = ({ children, open, handleClose }) => {
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
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          {children}
        </div>
        <div
          data-testid="modal-background"
          onClick={handleClose}
          style={{
            background: '#000',
            height: '100vh',
            left: 0,
            opacity: 0.5,
            position: 'absolute',
            top: 0,
            width: '100vw',
          }}
        >
        </div>
      </>,
      el.current,
    )
  );
};

export default PopupLogin;
