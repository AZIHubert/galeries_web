import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Field from '#components/Field';
import Button from '#components/Button';
import ModalContainer from '#components/ModalContainer';

import { resetConfirmSchema } from '#helpers/schemas';

import {
  fetchSendConfirmation,
  resetSendConfirmation,
  setSendConfirmation,
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
    dispatch(resetSendConfirmation());
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
      <form
        onSubmit={formik.handleSubmit}
        data-testid='form'
      >
        <Field
          disabled={loading}
          error={
            formik.errors.email || sendConfirmationError.email
          }
          fieldTestId='email'
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
        <Button.Gradiant
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
