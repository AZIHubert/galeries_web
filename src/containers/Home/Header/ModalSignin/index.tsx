import * as React from 'react';
import { useFormik } from 'formik';

import { signinSchema } from '#helpers/schemas';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';
import RequiredField from '#components/RequiredField';
import SocialMediaButton from '#components/SocialMediaButton';
import TextButton from '#components/TextButton';
import TextSepatator from '#components/TextSeparator';

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
  const formik = useFormik({
    initialValues,
    onSubmit: ({ email }) => {
      if (!loading) {
        setLoading(true);
        setAccountCreate(true);
        setCurrentEmail(email);
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
      <SocialMediaButton
        action='signin'
        disabled={loading}
        marginBottom={12}
        onClick={() => setLoading(true)}
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
