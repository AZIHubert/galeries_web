import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import {
  Container,
  Fader,
} from './styles';

type Variant = 'danger' | 'primary';

interface ModalTimerI {
  callBack?: () => void;
  handleClose: () => void;
  open: boolean;
  testId?: string;
  text: string;
  variant?: Variant;
}

const modalRoot = document.getElementById('modal-root');

const Timer = ({
  callBack,
  handleClose,
  open,
  testId,
  text,
  variant = 'primary',
}: ModalTimerI) => {
  const el = React.useRef(document.createElement('div'));
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (open) {
      timer.current = setTimeout(() => handleClose(), 3000);
      if (modalRoot) modalRoot.appendChild(el.current);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
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
        timeout={200}
        unmountOnExit
      >
        <Fader>
          <Container
            testId={testId}
            variant={variant}
          >
            {text}
          </Container>
        </Fader>
      </CSSTransition>,
      el.current,
    )
  );
};

export default Timer;
