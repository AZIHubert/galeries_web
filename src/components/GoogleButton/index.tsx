import axios from 'axios';
import * as React from 'react';
import GoogleLogin from 'react-google-login';

import SocialMediaButton from '#components/SocialMediaButton';

import { LoadingContext } from '#contexts/LoadingContext';
import { UserContext } from '#contexts/UserContext';

import {
  getMe,
  loginGoogle,
} from '#helpers/api';

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
  const source = React.useMemo(() => axios.CancelToken.source(), []);
  const { loading, setLoading } = React.useContext(LoadingContext);
  const { setUser } = React.useContext(UserContext);
  const responseGoogle = async (
    googleResponse: any,
  ) => {
    setLoading(true);
    try {
      const response = await loginGoogle(googleResponse.profileObj);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('expiresIn', response.data.expiresIn);
      const responseGetMe = await getMe({ source });
      setUser(responseGetMe.data);
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
  React.useEffect(() => () => {
    source.cancel('axios request cancelled');
  }, []);
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_ID!}
      cookiePolicy={'single_host_origin'}
      onFailure={(err) => console.log(err)}
      onSuccess={responseGoogle}
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
