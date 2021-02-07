import * as React from 'react';

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
  <div
    data-testid="modalValidateResetPassword"
  >
    <p>
      Reset your password
    </p>
    <p
      data-testid='validateResetPasswordBody'
    >
      To reset your password, click the
      verification button in
      the email we sent to {currentEmail}.
      This helps keep your account secure.
    </p>
    <p>
      No email in your inbox or spam folder?
      Let’s
    </p>
    <button
      disabled={loading}
      onClick={() => { if (!loading) { setLoading(true); } }}
    >
      resend it
    </button>
    <p>
      .
    </p>
  </div>
);

export default ModalValidateResetPassword;
