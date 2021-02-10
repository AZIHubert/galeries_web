import * as React from 'react';
import FacebookLogin, {
  ReactFacebookLoginInfo,
  ReactFacebookFailureResponse,
} from 'react-facebook-login';

import SocialMediaButton from '#components/SocialMediaButton';

import {
  loginFacebook,
} from '#helpers/api';

type Action = 'login' | 'signin';

interface FacebookButtonI {
  action?: Action;
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
}

const FacebookButton = ({
  action = 'login',
  loading = false,
  setError,
  setLoading,
  setOpenError,
}: FacebookButtonI) => {
  const responseFacebook = async (
    faceBookResponse: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ) => {
    setLoading(true);
    try {
      const response = await loginFacebook(faceBookResponse);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('expiresIn', response.data.expiresIn);
    } catch (err) {
      if (err.response) {
        if (err.status === 500) {
          setError('Something went wrong. Please try again.');
          setOpenError(true);
        } else {
          setError(err.response.data.errors);
          setOpenError(true);
        }
      } else {
        setError('Something went wrong. Please try again.');
        setOpenError(true);
      }
    }
    setLoading(false);
  };
  return (
    <FacebookLogin
      appId="688539228486770"
      fields="email, gender, name, picture.type(large)"
      onClick={() => {
        setOpenError(false);
        setError('');
        setLoading(true);
      }}
      callback={responseFacebook}
      render={(renderProps) => (
        <SocialMediaButton
          action={action}
          disabled={loading}
          marginBottom={10}
          onClick={renderProps.onClick}
        />
      )}
    />
  );
};

export default FacebookButton;
