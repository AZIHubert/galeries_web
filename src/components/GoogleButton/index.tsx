import * as React from 'react';

interface GoogleButtonI {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'login' | 'signin';
}

const GoogleButton = ({
  loading,
  setLoading,
  type,
}: GoogleButtonI) => (
  <button
    data-testid='button'
    disabled={loading}
    onClick={() => setLoading(true)}
  >
    {type === 'signin' && 'sign in '}
    {type === 'login' && 'log in '}
    with Google
  </button>
);

export default GoogleButton;
