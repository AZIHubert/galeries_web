import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import ModalContainer from '#components/ModalContainer';
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
        resetForm();
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

  React.useEffect(() => () => resetForm(), []);

  React.useEffect(() => {
    if (
      loginStatus === 'error'
      && notification.text === 'You\'re account need to be confimed'
    ) {
      setCurrentModal('resendConfirm');
    }
  });

  const resetForm = () => {
    dispatch(resetLogin());
  };

  return (
    <ModalContainer
      containerTestId='login'
    >
      <Button.Facebook
        action='signin'
      />
      <Button.Google
        action='signin'
      />
      <TextSepatator
        marginBottom={9}
        marginBottomL={16}
        marginTop={9}
        marginTopL={16}
        text='or'
      />
      <form
        onSubmit={formik.handleSubmit}
        data-testid='form'
      >
        <Field
          disabled={loading}
          error={
            formik.errors.userNameOrEmail || loginError.userNameOrEmail
          }
          fieldTestId='userNameOrEmail'
          id='userNameOrEmail'
          marginBottom={6}
          marginBottomL={10}
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
          marginBottom={12}
          marginBottomL={15}
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
          marginBottom={15}
          marginBottomL={22}
          marginTop={15}
          marginTopL={22}
          testId='button'
          type='submit'
          title='Log in'
        />
      </form>
      <Button.Text
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
