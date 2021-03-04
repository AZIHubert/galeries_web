import * as React from 'react';
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { fetchLoginFacebook } from '#store/actions';
import { loadingSelector } from '#store/selectors';

import SocialMediaButton from '../SocialMediaButton';

type Action = 'login' | 'signin';

interface FacebookI {
  action?: Action;
}

const Facebook = ({
  action = 'login',
}: FacebookI) => {
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
          styles={{
            marginBottom: 10,
          }}
          stylesLaptopL={{
            marginBottom: 13,
          }}
          onClick={renderProps.onClick}
        />
      )}
    />
  );
};

export default Facebook;
