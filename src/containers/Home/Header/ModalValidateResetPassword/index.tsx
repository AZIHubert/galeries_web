import * as React from 'react';

import ModalContainer from '#components/ModalContainer';
import TextButton from '#components/TextButton';
import ModalTimer from '#components/ModalTimer';

import { resendResetPassword } from '#helpers/api';

interface ModalValidateResetPasswordI {
  currentEmail: string;
  loading: boolean,
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalValidateResetPassword = ({
  currentEmail,
  loading,
  setError,
  setLoading,
}: ModalValidateResetPasswordI) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const onClick = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await resendResetPassword({ email: currentEmail });
        setOpen(true);
      } catch (err) {
        if (err.response) {
          if (err.status === 500) {
            setError('Something went wrong. Please try again');
          } else {
            const { errors } = err.response.data;
            setError(errors);
          }
        } else {
          setError('Something went wrong. Please try again');
        }
      }
      setLoading(false);
    }
  };
  return (
    <ModalContainer
      testId="modalValidateResetPassword"
      title='Reset your password'
      titleTextAlign='center'
    >
      <p
        data-testid='validateResetPasswordBody'
      >
        To reset your password, click the
        verification button in
        the email we sent to {currentEmail}.
        This helps keep your account secure.
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

export default ModalValidateResetPassword;
