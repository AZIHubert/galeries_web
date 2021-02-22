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

import { fetchSendConfirmation } from '#store/actions';
import {
  loadingSelector,
  sendConfirmationErrorSelector,
} from '#store/selectors';

const initialValues = {
  email: '',
};

const ModalResendConfirm = () => {
  const loading = useSelector(loadingSelector);
  const confirmationError = useSelector(sendConfirmationErrorSelector);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      dispatch(fetchSendConfirmation(value));
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: resetConfirmSchema,
  });
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
          id='email'
          error={
            formik.errors.email || confirmationError.email
          }
          label='email'
          marginTop={20}
          marginTopL={24}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
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
