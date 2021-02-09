import * as React from 'react';

import ModalContainer from '#components/ModalContainer';
import TextButton from '#components/TextButton';

interface ModalValidateResetPasswordI {
  currentEmail: string;
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalValidateResetPassword = ({
  currentEmail,
  loading,
  setLoading,
}: ModalValidateResetPasswordI) => (
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
      onClick={() => setLoading(true)}
      marginBottom={30}
      marginTop={20}
      text='No email in your inbox or spam folder? Let’s'
      textButton='resend it'
    />
  </ModalContainer>
);

export default ModalValidateResetPassword;
