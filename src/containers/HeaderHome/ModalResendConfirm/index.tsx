import { useFormik } from 'formik';
import * as React from 'react';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';

import { LoadingContext } from '#contexts/LoadingContext';

import { resendConfirmation } from '#helpers/api';
import { resetConfirmSchema } from '#helpers/schemas';

type Modals =
  'confirmLanding'
  | 'login'
  | 'resendConfirm'
  | 'resetPassword'
  | 'resetPasswordLanding'
  | 'signin';

interface ModalResendConfirmI {
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<Modals | null>>;
  setErrorModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    text: string;
  }>>
}

const initialValues = {
  email: '',
};

const ModalResendConfirm = ({
  setCurrentEmail,
  setCurrentModal,
  setErrorModal,
}: ModalResendConfirmI) => {
  const { loading, setLoading } = React.useContext(LoadingContext);
  const formik = useFormik({
    initialValues,
    onSubmit: async (value, { setFieldError }) => {
      if (!loading) {
        setLoading(true);
        try {
          await resendConfirmation(value);
          setCurrentEmail(value.email);
          setCurrentModal('confirmLanding');
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
    validationSchema: resetConfirmSchema,
  });
  return (
    <ModalContainer
      testId="modalResendPassword"
      title='Your account is not confirmed'
    >
      <p>
        To use Galeries, click the verification
        button in the email we sent
        to the email you've register.
        This helps keep your account secure.
      </p>
      <p>
        Or resend a confirmation email.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='email'
          error={formik.errors.email}
          errorTestId='emailError'
          fieldTestId='emailField'
          label='email'
          marginTop={20}
          marginTopL={24}
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
          marginTopL={24}
          type='submit'
          title='Reset'
        />
      </form>
    </ModalContainer>
  );
};

export default ModalResendConfirm;
