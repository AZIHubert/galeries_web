import * as React from 'react';

import ModalContainer from '#components/ModalContainer';
import ModalTimer from '#components/ModalTimer';
import TextButton from '#components/TextButton';

import { resendConfirmation } from '#helpers/api';

interface ModalVerifyAccountI {
  currentEmail: string;
  loading: boolean,
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalVerifyAccount = ({
  currentEmail,
  loading,
  setError,
  setLoading,
  setOpenError,
}: ModalVerifyAccountI) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const onClick = async () => {
    setLoading(true);
    try {
      await resendConfirmation({ email: currentEmail });
      setOpen(true);
    } catch (err) {
      if (err.response) {
        if (err.status === 500) {
          setError('Something went wrong. Please try again');
          setOpenError(true);
        } else {
          setError(err.response.data);
          setOpenError(true);
        }
      } else {
        setError('Something went wrong. Please try again');
        setOpenError(true);
      }
    }
    setLoading(false);
  };
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
        onClick={onClick}
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
