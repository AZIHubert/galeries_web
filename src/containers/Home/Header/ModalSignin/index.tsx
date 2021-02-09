import { useFormik } from 'formik';
import * as React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';
import RequiredField from '#components/RequiredField';
import SocialMediaButton from '#components/SocialMediaButton';
import TextButton from '#components/TextButton';
import TextSepatator from '#components/TextSeparator';

import { signin, loginFacebook } from '#helpers/api';

import { signinSchema } from '#helpers/schemas';

interface ModalSigninI {
  loading: boolean;
  setAccountCreate:React.Dispatch<React.SetStateAction<boolean>>;
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
  setLoading,
  switchModal,
}: ModalSigninI) => {
  const responseFacebook = async (
    faceBookResponse: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ) => {
    try {
      const response = await loginFacebook(faceBookResponse);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('expiresIn', response.data.expiresIn);
    } catch (err) {
      console.log(err.data);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError }) => {
      if (!loading) {
        try {
          const response = await signin(values);
          console.log(response.data);
          setAccountCreate(true);
          setCurrentEmail(values.email);
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
            onClick={renderProps.onClick}
          />
        )}
      />

      <SocialMediaButton
        action='signin'
        disabled={loading}
        onClick={() => setLoading(true)}
        variant='google'
      />
      <TextSepatator
        marginBottom={12}
        marginTop={12}
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
          marginBottom={20}
          marginTop={20}
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
