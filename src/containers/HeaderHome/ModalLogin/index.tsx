import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import FacebookButton from '#components/FacebookButton';
import Field from '#components/Field';
import GoogleButton from '#components/GoogleButton';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';
import RequiredField from '#components/RequiredField';
import TextButton from '#components/TextButton';
import TextSepatator from '#components/TextSeparator';

import { loginSchema } from '#helpers/schemas';

import {
  fetchLogin,
  setLogin,
} from '#store/actions';
import {
  loadingSelector,
  loginErrorSelector,
  loginStatusSelector,
  notificationSelector,
} from '#store/selectors';

import { ForgotPassword } from './styles';

interface ModalLoginI {
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<HeaderModals | null>>;
}

const initialValues = {
  password: '',
  userNameOrEmail: '',
};

const ModalLogin = ({
  setCurrentModal,
}: ModalLoginI) => {
  const loginError = useSelector(loginErrorSelector);
  const loading = useSelector(loadingSelector);
  const notification = useSelector(notificationSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      dispatch(fetchLogin(values));
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: loginSchema,
  });

  React.useEffect(() => () => {
    dispatch(setLogin({
      status: 'pending',
      errors: initialValues,
    }));
  }, []);

  React.useEffect(() => {
    if (
      loginStatus === 'error'
      && notification.text === 'You\'re account need to be confimed'
    ) {
      setCurrentModal('resendConfirm');
    }
  });

  return (
    <ModalContainer>
      <FacebookButton
        action='signin'
      />
      <GoogleButton
        action='signin'
      />
      <TextSepatator
        marginBottom={9}
        marginBottomL={16}
        marginTop={9}
        marginTopL={16}
        text='or'
      />
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='userNameOrEmail'
          error={
            formik.errors.userNameOrEmail || loginError.userNameOrEmail
          }
          marginBottom={6}
          marginBottomL={10}
          label='user name or email'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.userNameOrEmail}
          value={formik.values.userNameOrEmail}
        />
        <Field
          disabled={loading}
          id='password'
          error={
            formik.errors.password || loginError.password
          }
          label='password'
          marginBottom={12}
          marginBottomL={15}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <RequiredField />
        <div>
          <ForgotPassword
            onClick={() => {
              if (!loading) {
                setCurrentModal('resetPassword');
              }
            }}
            testId='forgotPasswordButton'
          >
              Forgot your password?
          </ForgotPassword>
        </div>
        <GradientButton
          disabled={loading}
          marginBottom={15}
          marginBottomL={22}
          marginTop={15}
          marginTopL={22}
          type='submit'
          title='Log in'
        />
      </form>
      <TextButton
        disabled={loading}
        fontSize={0.65}
        fontSizeL={0.8}
        justifyContent='center'
        onClick={() => setCurrentModal('signin')}
        text='You don’t have an account yet? click'
        textButton='here'
      />
    </ModalContainer>
  );
};

export default ModalLogin;
