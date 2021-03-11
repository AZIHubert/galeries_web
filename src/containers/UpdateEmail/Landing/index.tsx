import * as React from 'react';
import {
  useDispatch,
} from 'react-redux';
import {
  Link,
  useParams,
} from 'react-router-dom';

import Button from '#components/Button';
import Text from '#components/Text';

import {
  postUpdateEmailConfirm,
  resetUpdateEmailConfirm,
} from '#store/actions';

import {
  NavLink,
} from './styles';

interface LandingI {
  email: string;
  password: string;
}

const Landing = ({
  email,
  password,
}: LandingI) => {
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();

  React.useEffect(() => () => {
    dispatch(resetUpdateEmailConfirm());
  }, []);

  return (
    <div>
      <Text>
        an mail as been send to {email}.
        Click on the link on it to change your email.
      </Text>
      <Button.Text
        onClick={() => {
          dispatch(postUpdateEmailConfirm({
            email,
            password,
            confirmToken: `Bearer ${token}`,
          }));
        }}
        styles={{
          justifyContent: 'center',
          marginBottom: 30,
          marginTop: 20,
        }}
        text='No email in your inbox or spam folder? Let’s'
        textButton='resend it'
      />
      <NavLink>
        <Link
          to='/dashboard'
        >
          DASHBOARD
        </Link>
      </NavLink>
    </div>
  );
};

export default Landing;
