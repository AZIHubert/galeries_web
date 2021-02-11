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

import { LoadingContext } from '#contexts/LoadingContext';

import { login } from '#helpers/api';
import { loginSchema } from '#helpers/schemas';

import { ForgotPassword } from './styles';

interface ModalLoginI {
  setErrorModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    text: string;
  }>>;
  setModals: React.Dispatch<React.SetStateAction<'login' | 'signin' | 'resendConfirm' | 'forgotPassword' | 'validateAccount' | 'validateResetPassword' | null>>
}

const initialValues = {
  password: '',
  userNameOrEmail: '',
};

const ModalLogin = ({
  setErrorModal,
  setModals,
}: ModalLoginI) => {
  const { loading, setLoading } = React.useContext(LoadingContext);
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
              setErrorModal(({
                open: true,
                text: 'Something went wrong. Please try again',
              }));
            } else {
              const { errors } = err.response.data;
              if (typeof errors === 'object') {
                Object.keys(errors).map((error) => setFieldError(error, errors[error]));
              } else if (errors === 'You\'re account need to be confimed') {
                setModals('resendConfirm');
              } else {
                setErrorModal(({
                  open: true,
                  text: errors,
                }));
              }
            }
          } else {
            setErrorModal(({
              open: true,
              text: 'Something went wrong. Please try again',
            }));
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
        setErrorModal={setErrorModal}
      />
      <GoogleButton
        action='signin'
        setErrorModal={setErrorModal}
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
                setModals('forgotPassword');
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
        onClick={() => setModals('signin')}
        testId='switchToSignin'
        text='You don’t have an account yet? click'
        textButton='here'
      />
    </ModalContainer>
  );
};

export default ModalLogin;
