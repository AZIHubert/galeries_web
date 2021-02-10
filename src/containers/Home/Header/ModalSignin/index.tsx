import { useFormik } from 'formik';
import * as React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';
import RequiredField from '#components/RequiredField';
import SocialMediaButton from '#components/SocialMediaButton';
import TextButton from '#components/TextButton';
import TextSepatator from '#components/TextSeparator';

import {
  loginFacebook,
  loginGoogle,
  signin,
} from '#helpers/api';

import { signinSchema } from '#helpers/schemas';

interface ModalSigninI {
  loading: boolean;
  setAccountCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  switchModal: () => void;
}

const initialValues = {
  confirmPassword: '',
  email: '',
  password: '',
  userName: '',
};

const ModalSignin = ({
  loading,
  setAccountCreate,
  setCurrentEmail,
  setError,
  setLoading,
  switchModal,
}: ModalSigninI) => {
  const responseFacebook = async (
    faceBookResponse: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ) => {
    setLoading(true);
    try {
      const response = await loginFacebook(faceBookResponse);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('expiresIn', response.data.expiresIn);
    } catch (err) {
      if (err.response) {
        if (err.status === 500) {
          setError('Something went wrong. Please try again.');
        } else {
          setError(err.response.data.errors);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    setLoading(false);
  };
  const responseGoogle = async (
    googleResponse: any,
  ) => {
    setLoading(true);
    try {
      const response = await loginGoogle(googleResponse.profileObj);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('expiresIn', response.data.expiresIn);
    } catch (err) {
      if (err.response) {
        if (err.status === 500) {
          setError('Something went wrong. Please try again.');
        } else {
          setError(err.response.data.errors);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError }) => {
      if (!loading) {
        setLoading(true);
        setError('');
        try {
          const response = await signin(values);
          console.log(response.data);
          setAccountCreate(true);
          setCurrentEmail(values.email);
        } catch (err) {
          if (err.response) {
            if (err.status === 500) {
              setError('Something went wrong. Please try again');
            } else {
              const { errors } = err.response.data;
              if (typeof errors === 'object') {
                Object.keys(errors).map((error) => setFieldError(error, errors[error]));
              } else {
                setError('Something went wrong. Please try again');
              }
            }
          } else {
            setError('Something went wrong. Please try again');
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
      <FacebookLogin
        appId="688539228486770"
        fields="email, gender, name, picture.type(large)"
        onClick={() => setLoading(true)}
        callback={responseFacebook}
        render={(renderProps) => (
          <SocialMediaButton
            action='signin'
            disabled={loading}
            marginBottom={12}
            onClick={() => {
              setError('');
              renderProps.onClick();
            }}
          />
        )}
      />
      <GoogleLogin
        clientId="863840240633-tve0cuo6hib6uhgap61j1nkq03k7k5vq.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={(err) => console.log(err)}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <SocialMediaButton
            action='signin'
            disabled={loading}
            onClick={() => {
              setError('');
              renderProps.onClick();
            }}
            variant='google'
          />
        )}
      />
      <TextSepatator
        marginBottom={10}
        marginTop={10}
        text='or'
      />
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='userName'
          error={formik.errors.userName}
          errorTestId='userNameError'
          fieldTestId='userNameField'
          marginBottom={7}
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
          marginBottom={7}
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
          marginBottom={7}
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
          marginBottom={15}
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
          testId='submitButton'
          disabled={loading}
          marginBottom={15}
          marginTop={15}
          type='submit'
          title='Sign in'
        />
      </form>
      <TextButton
        disabled={loading}
        fontSize={0.65}
        justifyContent='center'
        onClick={switchModal}
        testId='switchToLogin'
        text='You already have an account? click'
        textButton='here'
      />
    </ModalContainer>
  );
};

export default ModalSignin;
