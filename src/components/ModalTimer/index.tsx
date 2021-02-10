import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Container } from './styles';

type Variant = 'danger' | 'primary';

const modalRoot = document.getElementById('modal-root');
interface ModalTimerI {
  handleClose: () => void;
  open: boolean;
  testId?: string;
  text: string;
  variant?: Variant;
}

const ModalTimer = ({
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
      if (modalRoot) {
        modalRoot.appendChild(el.current);
      }
    }
    return () => {
      if (modalRoot && open) {
        modalRoot.removeChild(el.current);
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [open]);
  if (!open) return null;
  return (
    ReactDOM.createPortal(
      <Container
        testId={testId}
        variant={variant}
      >
        {text}
      </Container>,
      el.current,
    )
  );
};

export default ModalTimer;
