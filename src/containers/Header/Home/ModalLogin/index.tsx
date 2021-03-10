import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import Modal from '#components/Modal';
import RequiredField from '#components/RequiredField';
import TextSepatator from '#components/TextSeparator';

import { loginSchema } from '#helpers/schemas';

import {
  fetchLogin,
  resetLogin,
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
  setCurrentModal: React.Dispatch<React.SetStateAction<HeaderModals | null>>;
}

const initialValues: form.LoginI = {
  password: '',
  userNameOrEmail: '',
};

const ModalLogin = ({
  setCurrentModal,
}: ModalLoginI) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(fetchLogin(values));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: loginSchema,
  });
  const loading = useSelector(loadingSelector);
  const loginError = useSelector(loginErrorSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const notification = useSelector(notificationSelector);

  React.useEffect(() => () => {
    dispatch(resetLogin());
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
    <Modal.Container
      containerTestId='login'
    >
      <Button.Facebook
        action='signin'
      />
      <Button.Google
        action='signin'
      />
      <TextSepatator
        styles={{
          marginBottom: 9,
          marginTop: 9,
        }}
        stylesLaptopL={{
          marginBottom: 16,
          marginTop: 16,
        }}
        text='or'
      />
      <form
        data-testid='form'
        onSubmit={formik.handleSubmit}
      >
        <Field
          disabled={loading}
          error={
            formik.errors.userNameOrEmail || loginError.userNameOrEmail
          }
          fieldTestId='userNameOrEmail'
          id='userNameOrEmail'
          label='user name or email'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (loginError.userNameOrEmail) {
              dispatch(setLogin({
                errors: {
                  ...loginError,
                  userNameOrEmail: '',
                },
              }));
            }
          }}
          required
          styles={{
            marginBottom: 6,
          }}
          stylesLaptopL={{
            marginBottom: 10,
          }}
          touched={formik.touched.userNameOrEmail}
          value={formik.values.userNameOrEmail}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.password || loginError.password
          }
          fieldTestId='password'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (loginError.password) {
              dispatch(setLogin({
                errors: {
                  ...loginError,
                  password: '',
                },
              }));
            }
          }}
          required
          styles={{
            marginBottom: 12,
          }}
          stylesLaptopL={{
            marginBottom: 15,
          }}
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
        <Button.Gradiant
          disabled={loading}
          styles={{
            marginBottom: 15,
            marginTop: 15,
          }}
          stylesLaptopL={{
            marginBottom: 22,
            marginTop: 22,
          }}
          testId='button'
          title='Log in'
          type='submit'
        />
      </form>
      <Button.Text
        disabled={loading}
        onClick={() => setCurrentModal('signin')}
        styles={{
          fontSize: 0.65,
          justifyContent: 'center',
        }}
        stylesLaptopL={{
          fontSize: 0.8,
        }}
        text='You don’t have an account yet? click'
        textButton='here'
      />
    </Modal.Container>
  );
};

export default ModalLogin;
