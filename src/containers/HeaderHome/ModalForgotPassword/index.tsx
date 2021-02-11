import { useFormik } from 'formik';
import * as React from 'react';

import Field from '#components/Field';

import { allowResetPasswordSchema } from '#helpers/schemas';

import ModalContainer from '#components/ModalContainer';
import GradientButton from '#components/GradientButton';

import { LoadingContext } from '#contexts/LoadingContext';

import { resendResetPassword } from '#helpers/api';

import {
  CancelButton,
  CancelButtonContainer,
} from './styles';

type Modals =
  'login'
  | 'signin'
  | 'resendConfirm'
  | 'forgotPassword'
  | 'validateAccount'
  | 'validateResetPassword';

interface ModalForgotPasswordI {
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setErrorModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    text: string;
  }>>;
  setModals: React.Dispatch<React.SetStateAction<Modals | null>>;
}

const initialValues = {
  email: '',
};

const ModalForgotPassword = ({
  setCurrentEmail,
  setErrorModal,
  setModals,
}: ModalForgotPasswordI) => {
  const { loading, setLoading } = React.useContext(LoadingContext);
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { setFieldError }) => {
      if (!loading) {
        setLoading(true);
        try {
          await resendResetPassword(value);
          setCurrentEmail(value.email);
          setModals('validateResetPassword');
        } catch (err) {
          if (err.response) {
            if (err.status === 500) {
              setErrorModal({
                open: true,
                text: 'Something went wrong. Please try again',
              });
            } else {
              const { errors } = err.response.data;
              if (typeof errors === 'object') {
                Object.keys(errors).map((error) => setFieldError(error, errors[error]));
              } else {
                setErrorModal({
                  open: true,
                  text: errors,
                });
              }
            }
          } else {
            setErrorModal({
              open: true,
              text: 'Something went wrong. Please try again',
            });
          }
        }
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: allowResetPasswordSchema,
  });
  return (
    <ModalContainer
      testId="modalForgotPassword"
      title='Enter your email to reset your password'
    >
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='email'
          error={formik.errors.email}
          errorTestId='emailError'
          fieldTestId='emailField'
          label='email'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          touched={formik.touched.email}
          value={formik.values.email}
        />
        <GradientButton
          testId='submitButton'
          disabled={loading}
          marginBottom={20}
          marginTop={20}
          type='submit'
          title='Reset'
        />
      </form>
      <CancelButtonContainer>
        <CancelButton
          testId='cancelButton'
          onClick={() => {
            if (!loading) {
              setModals('login');
            }
          }}
        >
          Cancel
        </CancelButton>
      </CancelButtonContainer>
    </ModalContainer>
  );
};

export default ModalForgotPassword;
