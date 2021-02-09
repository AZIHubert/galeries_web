import * as React from 'react';

import ModalContainer from '#components/ModalContainer';
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
}: ModalVerifyAccountI) => (
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
      onClick={() => setLoading(true)}
      marginBottom={30}
      marginTop={20}
      text='No email in your inbox or spam folder? Let’s'
      textButton='resend it'
    />
  </ModalContainer>
);

export default ModalVerifyAccount;
