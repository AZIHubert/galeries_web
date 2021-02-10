import { useFormik } from 'formik';
import * as React from 'react';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';
import RequiredField from '#components/RequiredField';
import SocialMediaButton from '#components/SocialMediaButton';
import TextButton from '#components/TextButton';
import TextSepatator from '#components/TextSeparator';

import { login } from '#helpers/api';
import { loginSchema } from '#helpers/schemas';

import { ForgotPassword } from './styles';

interface ModalLoginI {
  loading: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  switchModal: () => void;
}

const initialValues = {
  password: '',
  userNameOrEmail: '',
};

const ModalLogin = ({
  loading,
  setForgotPassword,
  setLoading,
  switchModal,
}: ModalLoginI) => {
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError }) => {
      if (!loading) {
        try {
          const response = await login(values);
          localStorage.setItem('authToken', response.data.token);
          console.log(response.data);
          setLoading(false);
        } catch (err) {
          const { errors } = err.response.data;
          if (typeof errors === 'object') {
            Object.keys(errors).map((error) => setFieldError(error, errors[error]));
          }
          setLoading(false);
        }
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
      <SocialMediaButton
        action='login'
        disabled={loading}
        marginBottom={12}
        onClick={() => setLoading(true)}
      />
      <SocialMediaButton
        action='login'
        disabled={loading}
        onClick={() => setLoading(true)}
        variant='google'
      />
      <TextSepatator
        marginBottom={10}
        marginTop={10}
        text='or'
      />
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='userNameOrEmail'
          error={formik.errors.userNameOrEmail}
          errorTestId='userNameOrEmailError'
          fieldTestId='userNameOrEmailField'
          marginBottom={7}
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
          marginBottom={15}
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
