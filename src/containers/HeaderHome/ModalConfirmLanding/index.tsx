import * as React from 'react';

import ModalContainer from '#components/ModalContainer';
import ModalTimer from '#components/ModalTimer';
import TextButton from '#components/TextButton';

import { LoadingContext } from '#contexts/LoadingContext';

import { resendConfirmation } from '#helpers/api';

interface ModalConfirmLandingI {
  currentEmail: string;
  setErrorModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    text: string;
  }>>;
}

const ModalConfirmLanding = ({
  currentEmail,
  setErrorModal,
}: ModalConfirmLandingI) => {
  const { loading, setLoading } = React.useContext(LoadingContext);
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
          setErrorModal({
            open: true,
            text: 'Something went wrong. Please try again',
          });
        } else {
          setErrorModal({
            open: true,
            text: err.response.data,
          });
        }
      } else {
        setErrorModal({
          open: true,
          text: 'Something went wrong. Please try again',
        });
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

export default ModalConfirmLanding;
