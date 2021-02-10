import { useFormik } from 'formik';
import * as React from 'react';

import Field from '#components/Field';

import { resetPasswordSchema } from '#helpers/schemas';

import ModalContainer from '#components/ModalContainer';
import GradientButton from '#components/GradientButton';

import { resendResetPassword } from '#helpers/api';

import {
  CancelButton,
  CancelButtonContainer,
} from './styles';

interface ModalForgotPasswordI {
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  switchModal: () => void;
  loading: boolean;
}

const initialValues = {
  email: '',
};

const ModalForgotPassword = ({
  setCurrentEmail,
  setError,
  setForgotPassword,
  setLoading,
  switchModal,
  loading,
}: ModalForgotPasswordI) => {
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { setFieldError }) => {
      if (!loading) {
        setLoading(true);
        try {
          await resendResetPassword(value);
          setCurrentEmail(value.email);
          switchModal();
        } catch (err) {
          if (err.response) {
            if (err.status === 500) {
              setError('Something went wrong. Please try again');
            } else {
              const { errors } = err.response.data;
              if (typeof errors === 'object') {
                Object.keys(errors).map((error) => setFieldError(error, errors[error]));
              } else {
                setError(errors);
              }
            }
          } else {
            setError('Something went wrong. Please try again');
          }
        }
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: resetPasswordSchema,
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
              setForgotPassword(false);
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
