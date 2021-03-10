import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Footer from '#containers/Footer';

import { resetUpdatePassword } from '#store/actions';
import { userSelector } from '#store/selectors';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import Part from './Part';

import {
  Container,
} from './styles';

const Edit = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  React.useEffect(() => () => {
    dispatch(resetUpdatePassword());
  }, []);

  const isNotAFacebookOrGoogleUser = user && !user.facebookId && !user.googleId;

  return (
    <Container>
      {isNotAFacebookOrGoogleUser && (
        <>
          <Part
            title='Change your password'
          >
            <ChangePassword />
          </Part>
          <Part
            title='Change your email'
          >
            <ChangeEmail />
          </Part>
          <Part
            danger
            title='Delete your account'
          >
            <DeleteAccount />
          </Part>
        </>
      )}
      <Footer />
    </Container>
  );
};

export default Edit;
