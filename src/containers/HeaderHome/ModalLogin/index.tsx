import { useFormik } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

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

type Modals =
  'confirmLanding'
  | 'login'
  | 'resendConfirm'
  | 'resetPassword'
  | 'resetPasswordLanding'
  | 'signin';

interface ModalLoginI {
  closeModal: () => void;
  setCurrentModal: React.Dispatch<React.SetStateAction<Modals | null>>
  setErrorModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    text: string;
  }>>;
}

const initialValues = {
  password: '',
  userNameOrEmail: '',
};

const ModalLogin = ({
  closeModal,
  setErrorModal,
  setCurrentModal,
}: ModalLoginI) => {
  const history = useHistory();
  const { loading, setLoading } = React.useContext(LoadingContext);
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError }) => {
      if (!loading) {
        setLoading(true);
        try {
          const response = await login(values);
          const expiresAt = moment().add(response.data.expiresIn);
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('expiresIn', JSON.stringify(expiresAt.valueOf()));
          closeModal();
          history.push('/dashboard');
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
                setCurrentModal('resendConfirm');
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
        marginBottomL={16}
        marginTop={9}
        marginTopL={16}
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
          error={formik.errors.password}
          errorTestId='passwordError'
          fieldTestId='passwordField'
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
          testId='submitButton'
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
        testId='switchToSignin'
        text='You don’t have an account yet? click'
        textButton='here'
      />
    </ModalContainer>
  );
};

export default ModalLogin;
