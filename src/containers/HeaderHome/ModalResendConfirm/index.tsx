import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';

import { resetConfirmSchema } from '#helpers/schemas';

import {
  setSendConfirmation,
  fetchSendConfirmation,
} from '#store/actions';
import {
  loadingSelector,
  sendConfirmationErrorSelector,
} from '#store/selectors';

const initialValues: form.SendConfirmationI = {
  email: '',
};

const ModalResendConfirm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      if (!loading) {
        resetForm();
        dispatch(fetchSendConfirmation(value));
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: resetConfirmSchema,
  });
  const sendConfirmationError = useSelector(sendConfirmationErrorSelector);
  const loading = useSelector(loadingSelector);

  React.useEffect(() => () => resetForm(), []);

  const resetForm = () => {
    dispatch(setSendConfirmation({
      errors: initialValues,
      status: 'pending',
    }));
  };

  return (
    <ModalContainer
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
          error={
            formik.errors.email || sendConfirmationError.email
          }
          id='email'
          label='email'
          marginTop={20}
          marginTopL={24}
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (sendConfirmationError.email) {
              dispatch(setSendConfirmation({
                errors: {
                  ...sendConfirmationError,
                  email: '',
                },
              }));
            }
          }}
          touched={formik.touched.email}
          value={formik.values.email}
        />
        <GradientButton
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
