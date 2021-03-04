import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import Modal from '#components/Modal';
import Text from '#components/Text';

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

import ModalTitle from './ModalTitle';

const initialValues: form.SendConfirmationI = {
  email: '',
};

const ModalResendConfirm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      if (!loading) {
        dispatch(fetchSendConfirmation(value));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: resetConfirmSchema,
  });
  const loading = useSelector(loadingSelector);
  const sendConfirmationError = useSelector(sendConfirmationErrorSelector);

  React.useEffect(() => () => {
    dispatch(resetSendConfirmation());
  }, []);

  return (
    <Modal.Container
      title={<ModalTitle />}
    >
      <Text>
        To use Galeries, click the verification
        button in the email we sent
        to the email you've register.
        This helps keep your account secure.
      </Text>
      <Text>
        Or resend a confirmation email.
      </Text>
      <form
        data-testid='form'
        onSubmit={formik.handleSubmit}
      >
        <Field
          disabled={loading}
          error={
            formik.errors.email || sendConfirmationError.email
          }
          fieldTestId='email'
          id='email'
          label='email'
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
          styles={{
            marginTop: 20,
          }}
          stylesLaptopL={{
            marginTop: 24,
          }}
          touched={formik.touched.email}
          value={formik.values.email}
        />
        <Button.Gradiant
          disabled={loading}
          styles={{
            marginBottom: 20,
            marginTop: 20,
          }}
          stylesLaptopL={{
            marginTop: 24,
          }}
          title='Reset'
          type='submit'
        />
      </form>
    </Modal.Container>
  );
};

export default ModalResendConfirm;
