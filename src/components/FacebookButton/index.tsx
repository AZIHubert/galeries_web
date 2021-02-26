import * as React from 'react';
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import SocialMediaButton from '#components/SocialMediaButton';

import { fetchLoginFacebook } from '#store/actions';
import { loadingSelector } from '#store/selectors';

type Action = 'login' | 'signin';

interface FacebookButtonI {
  action?: Action;
}

const FacebookButton = ({
  action = 'login',
}: FacebookButtonI) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  const responseFacebook = async (
    faceBookResponse: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ) => {
    dispatch(fetchLoginFacebook(faceBookResponse));
  };

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
          onClick={renderProps.onClick}
        />
      )}
    />
  );
};

export default FacebookButton;
