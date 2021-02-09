import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

const modalRoot = document.getElementById('modal-root');

const Container = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 7px 14px;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

interface ModalTimerI {
  handleClose: () => void;
  open: boolean;
  text: string;
}

const ModalTimer = ({
  handleClose,
  open,
  text,
}: ModalTimerI) => {
  const el = React.useRef(document.createElement('div'));
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (modalRoot && open) {
      modalRoot.appendChild(el.current);
      timer.current = setTimeout(() => handleClose(), 3000);
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
  return (
    ReactDOM.createPortal(
      <Container
        data-testid="modal"
      >
        {text}
      </Container>,
      el.current,
    )
  );
};

export default ModalTimer;
