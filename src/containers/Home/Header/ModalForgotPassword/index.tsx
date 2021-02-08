import { useFormik } from 'formik';
import * as React from 'react';

import Field from '#components/Field';

import { resetPasswordSchema } from '#helpers/schemas';

import ModalContainer from '#components/ModalContainer';
import GradientButton from '#components/GradientButton';

import {
  CancelButton,
  CancelButtonContainer,
} from './styles';

interface ModalForgotPasswordI {
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
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
  setForgotPassword,
  setLoading,
  switchModal,
  loading,
}: ModalForgotPasswordI) => {
  const formik = useFormik({
    initialValues,
    onSubmit: ({ email }) => {
      if (!loading) {
        setLoading(true);
        switchModal();
        setCurrentEmail(email);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: resetPasswordSchema,
  });
  return (
    <ModalContainer
      data-testid="modalForgotPassword"
      title='Enter your email to reset your password'
    >
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='email'
          error={formik.errors.email}
          label='email'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          touched={formik.touched.email}
          value={formik.values.email}
        />
        <GradientButton
          data-testid='submitButton'
          disabled={loading}
          marginBottom={20}
          marginTop={20}
          type='submit'
          title='Reset'
        />
      </form>
      <CancelButtonContainer>
        <CancelButton
          data-testid='cancelButton'
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
