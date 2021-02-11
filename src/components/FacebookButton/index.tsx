import * as React from 'react';
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';

import SocialMediaButton from '#components/SocialMediaButton';

import { LoadingContext } from '#contexts/LoadingContext';

import { loginFacebook } from '#helpers/api';

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
    <FacebookLogin
      appId="688539228486770"
      callback={responseFacebook}
      fields="email, gender, name, picture.type(large)"
      render={(renderProps) => (
        <SocialMediaButton
          action={action}
          disabled={loading}
          marginBottom={10}
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
