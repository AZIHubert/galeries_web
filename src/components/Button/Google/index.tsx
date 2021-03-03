import * as React from 'react';
import GoogleLogin from 'react-google-login';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import SocialMediaButton from '../SocialMediaButton';

import {
  fetchLoginGoogle,
} from '#store/actions';
import { loadingSelector } from '#store/selectors';

type Action = 'login' | 'signin';

interface GoogleButtonI {
  action: Action;
}

const GoogleButton = ({
  action = 'login',
}: GoogleButtonI) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  const responseGoogle = async (
    googleResponse: any,
  ) => {
    dispatch(fetchLoginGoogle(googleResponse.profileObj));
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_ID!}
      cookiePolicy={'single_host_origin'}
      onSuccess={responseGoogle}
      render={(renderProps) => (
        <SocialMediaButton
          action={action}
          disabled={loading}
          onClick={renderProps.onClick}
          variant='google'
        />
      )}
    />
  );
};

export default GoogleButton;
