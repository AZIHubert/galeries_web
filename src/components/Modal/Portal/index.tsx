import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import {
  Background,
  Container,
  Fader,
} from './styles';

interface PortalI {
  backgroundTestId?: string;
  callBack?: () => void;
  children: React.ReactNode;
  handleClose: () => void;
  modalTestId?: string;
  open: boolean;
}

const modalRoot = document.getElementById('modal-root');

const Portal = ({
  backgroundTestId,
  callBack,
  children,
  handleClose,
  modalTestId,
  open,
}: PortalI) => {
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
            testId={modalTestId}
          >
            {children}
          </Container>
          <Background
            onClick={handleClose}
            testId={backgroundTestId}
          />
        </Fader>
      </CSSTransition>,
      el.current,
    )
  );
};

export default Portal;
