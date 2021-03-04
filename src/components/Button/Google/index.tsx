import * as React from 'react';
import GoogleLogin from 'react-google-login';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { fetchLoginGoogle } from '#store/actions';
import { loadingSelector } from '#store/selectors';

import SocialMediaButton from '../SocialMediaButton';

type Action = 'login' | 'signin';

interface GoogleI {
  action: Action;
}

const Google = ({
  action = 'login',
}: GoogleI) => {
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

export default Google;
