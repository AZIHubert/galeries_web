import * as React from 'react';

import logoFacebook from '#ressources/images/facebookLogo.png';

interface FacebookButtonI {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'login' | 'signin';
}

const FacebookButton = ({
  loading,
  setLoading,
  type,
}: FacebookButtonI) => (
  <button
    data-testid='button'
    disabled={loading}
    onClick={() => setLoading(true)}
  >
    <img src={logoFacebook} alt='logo facebook' />
    {type === 'signin' && 'sign in '}
    {type === 'login' && 'log in '}
    with Facebook
  </button>
);

export default FacebookButton;
