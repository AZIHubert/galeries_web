import axios from 'axios';
import * as React from 'react';
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';

import SocialMediaButton from '#components/SocialMediaButton';

import { LoadingContext } from '#contexts/LoadingContext';
import { UserContext } from '#contexts/UserContext';

import {
  getMe,
  loginFacebook,
} from '#helpers/api';

type Action = 'login' | 'signin';

interface FacebookButtonI {
  action?: Action;
  setErrorModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    text: string;
  }>>;
}

const FacebookButton = ({
  action = 'login',
  setErrorModal,
}: FacebookButtonI) => {
  const { loading, setLoading } = React.useContext(LoadingContext);
  const { setUser } = React.useContext(UserContext);
  const source = React.useMemo(() => axios.CancelToken.source(), []);
  const responseFacebook = async (
    faceBookResponse: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ) => {
    setLoading(true);
    try {
      const response = await loginFacebook(faceBookResponse);
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
    <FacebookLogin
      appId={process.env.FACEBOOK_ID!}
      callback={responseFacebook}
      fields="email, gender, name, picture.type(large)"
      render={(renderProps) => (
        <SocialMediaButton
          action={action}
          disabled={loading}
          marginBottom={10}
          marginBottomL={13}
          onClick={() => {
            setErrorModal((prevState) => ({
              ...prevState,
              open: false,
            }));
            renderProps.onClick();
          }}
        />
      )}
    />
  );
};

export default FacebookButton;
