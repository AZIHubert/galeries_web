import { useFormik } from 'formik';
import * as React from 'react';

import FacebookButton from '#components/FacebookButton';
import Field from '#components/Field';
import GoogleButton from '#components/GoogleButton';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';
import RequiredField from '#components/RequiredField';
import TextButton from '#components/TextButton';
import TextSepatator from '#components/TextSeparator';

import { login } from '#helpers/api';
import { loginSchema } from '#helpers/schemas';

import { ForgotPassword } from './styles';

interface ModalLoginI {
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
  switchModal: () => void;
}

const initialValues = {
  password: '',
  userNameOrEmail: '',
};

const ModalLogin = ({
  loading,
  setError,
  setForgotPassword,
  setLoading,
  setOpenError,
  switchModal,
}: ModalLoginI) => {
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError }) => {
      if (!loading) {
        setLoading(true);
        try {
          const response = await login(values);
          localStorage.setItem('authToken', response.data.token);
          console.log(response.data);
        } catch (err) {
          if (err.response) {
            if (err.status === 500) {
              setError('Something went wrong. Please try again');
              setOpenError(true);
            } else {
              const { errors } = err.response.data;
              if (typeof errors === 'object') {
                Object.keys(errors).map((error) => setFieldError(error, errors[error]));
              } else {
                setError(errors);
                setOpenError(true);
              }
            }
          } else {
            setError('Something went wrong. Please try again');
            setOpenError(true);
          }
        }
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: loginSchema,
  });

  return (
    <ModalContainer
      testId='loginModal'
    >
      <FacebookButton
        action='signin'
        loading={loading}
        setError={setError}
        setLoading={setLoading}
        setOpenError={setOpenError}
      />
      <GoogleButton
        action='signin'
        loading={loading}
        setError={setError}
        setLoading={setLoading}
        setOpenError={setOpenError}
      />
      <TextSepatator
        marginBottom={9}
        marginTop={9}
        text='or'
      />
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='userNameOrEmail'
          error={formik.errors.userNameOrEmail}
          errorTestId='userNameOrEmailError'
          fieldTestId='userNameOrEmailField'
          marginBottom={6}
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
          error={formik.errors.password}
          errorTestId='passwordError'
          fieldTestId='passwordField'
          label='password'
          marginBottom={12}
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
            testId='forgotPasswordButton'
            onClick={() => {
              if (!loading) {
                setForgotPassword(true);
              }
            }}
          >
              Forgot your password?
          </ForgotPassword>
        </div>
        <GradientButton
          testId='submitButton'
          disabled={loading}
          marginBottom={15}
          marginTop={15}
          type='submit'
          title='Log in'
        />
      </form>
      <TextButton
        disabled={loading}
        fontSize={0.65}
        justifyContent='center'
        onClick={switchModal}
        testId='switchToSignin'
        text='You don’t have an account yet? click'
        textButton='here'
      />
    </ModalContainer>
  );
};

export default ModalLogin;
