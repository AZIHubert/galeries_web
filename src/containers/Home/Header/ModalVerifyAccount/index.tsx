import * as React from 'react';

import ModalContainer from '#components/ModalContainer';
import ModalTimer from '#components/ModalTimer';
import TextButton from '#components/TextButton';

interface ModalVerifyAccountI {
  currentEmail: string;
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalVerifyAccount = ({
  currentEmail,
  loading,
  setLoading,
}: ModalVerifyAccountI) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  return (
    <ModalContainer
      testId="modalVerifyAccount"
      title='Verify your email'
      titleTextAlign='center'
    >
      <p
        data-testid='verifyAccountBody'
      >
      To use Galeries, click the verification
      button in the email we sent
      to {currentEmail}. This helps keep
      your account secure.
      </p>
      <TextButton
        disabled={loading}
        justifyContent='center'
        onClick={() => {
          setLoading(true);
          setOpen(true);
        }}
        marginBottom={30}
        marginTop={20}
        text='No email in your inbox or spam folder? Let’s'
        textButton='resend it'
      />
      <ModalTimer
        handleClose={handleClose}
        open={open}
        text='email resend'
      />
    </ModalContainer>
  );
};

export default ModalVerifyAccount;
