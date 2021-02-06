import * as React from 'react';

interface ModalVerifyAccountI {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalVerifyAccount = ({
  loading,
  setLoading,
}: ModalVerifyAccountI) => (
  <div
    data-testid="modalVerifyAccount"
  >
    <p>
      Verify your email
    </p>
    <p>
      To use Galeries, click the verification
      button in the email we sent
      to user@email.com. This helps keep
      your account secure.
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

export default ModalVerifyAccount;
