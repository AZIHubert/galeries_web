import * as React from 'react';
import GoogleLogin from 'react-google-login';

import SocialMediaButton from '#components/SocialMediaButton';

import { LoadingContext } from '#contexts/LoadingContext';

import { loginGoogle } from '#helpers/api';

type Action = 'login' | 'signin';

interface GoogleButtonI {
  action: Action;
  setErrorModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    text: string;
  }>>;
}

const GoogleButton = ({
  action = 'login',
  setErrorModal,
}: GoogleButtonI) => {
  const { loading, setLoading } = React.useContext(LoadingContext);
  const responseGoogle = async (
    googleResponse: any,
  ) => {
    setLoading(true);
    try {
      const response = await loginGoogle(googleResponse.profileObj);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('expiresIn', response.data.expiresIn);
    } catch (err) {
      if (err.response) {
        if (err.status === 500) {
          setErrorModal({
            open: true,
            text: 'Something went wrong. Please try again.',
          });
        } else {
          setErrorModal({
            open: true,
            text: err.response.data.errors,
          });
        }
      } else {
        setErrorModal({
          open: true,
          text: 'Something went wrong. Please try again.',
        });
      }
    }
    setLoading(false);
  };
  return (
    <GoogleLogin
      clientId="863840240633-tve0cuo6hib6uhgap61j1nkq03k7k5vq.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={(err) => console.log(err)}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <SocialMediaButton
          action={action}
          disabled={loading}
          onClick={() => {
            setErrorModal((prevState) => ({
              ...prevState,
              open: false,
            }));
            renderProps.onClick();
          }}
          variant='google'
        />
      )}
    />
  );
};

export default GoogleButton;
