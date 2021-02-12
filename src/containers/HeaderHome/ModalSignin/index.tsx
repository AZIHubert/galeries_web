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

import { signin } from '#helpers/api';

import { signinSchema } from '#helpers/schemas';

type Modals =
  'confirmLanding'
  | 'login'
  | 'resendConfirm'
  | 'resetPassword'
  | 'resetPasswordLanding'
  | 'signin';

interface ModalSigninI {
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<Modals | null>>;
  setErrorModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    text: string;
  }>>;
}

const initialValues = {
  confirmPassword: '',
  email: '',
  password: '',
  userName: '',
};

const ModalSignin = ({
  setCurrentEmail,
  setCurrentModal,
  setErrorModal,
}: ModalSigninI) => {
  const { loading, setLoading } = React.useContext(LoadingContext);
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError }) => {
      if (!loading) {
        setLoading(true);
        setErrorModal((prevState) => ({
          ...prevState,
          open: false,
        }));
        try {
          await signin(values);
          setCurrentModal('confirmLanding');
          setCurrentEmail(values.email);
        } catch (err) {
          if (err.response) {
            if (err.status === 500) {
              setErrorModal({
                open: false,
                text: 'Something went wrong. Please try again',
              });
            } else {
              const { errors } = err.response.data;
              if (typeof errors === 'object') {
                Object.keys(errors).map((error) => setFieldError(error, errors[error]));
              } else {
                setErrorModal({
                  open: false,
                  text: errors,
                });
              }
            }
          } else {
            setErrorModal({
              open: false,
              text: 'Something went wrong. Please try again',
            });
          }
        }
        setLoading(false);
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: signinSchema,
  });

  return (
    <ModalContainer
      testId='modalSignin'
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
          id='userName'
          error={formik.errors.userName}
          errorTestId='userNameError'
          fieldTestId='userNameField'
          marginBottom={6}
          label='user name'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.userName}
          value={formik.values.userName}
        />
        <Field
          disabled={loading}
          id='email'
          error={formik.errors.email}
          errorTestId='emailError'
          fieldTestId='emailField'
          marginBottom={6}
          label='email'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.email}
          value={formik.values.email}
        />
        <Field
          disabled={loading}
          id='password'
          error={formik.errors.password}
          errorTestId='passwordError'
          fieldTestId='passwordField'
          marginBottom={6}
          label='password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <Field
          disabled={loading}
          id='confirmPassword'
          error={formik.errors.confirmPassword}
          errorTestId='confirmPasswordError'
          fieldTestId='confirmPasswordField'
          marginBottom={12}
          label='confirm password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.confirmPassword}
          type='password'
          value={formik.values.confirmPassword}
        />
        <RequiredField />
        <GradientButton
          disabled={loading}
          marginBottom={15}
          marginTop={15}
          testId='submitButton'
          type='submit'
          title='Sign in'
        />
      </form>
      <TextButton
        disabled={loading}
        fontSize={0.65}
        justifyContent='center'
        onClick={() => setCurrentModal('login')}
        testId='switchToLogin'
        text='You already have an account? click'
        textButton='here'
      />
    </ModalContainer>
  );
};

export default ModalSignin;
