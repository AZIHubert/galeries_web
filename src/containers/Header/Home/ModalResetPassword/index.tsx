import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import Modal from '#components/Modal';

import { allowResetPasswordSchema } from '#helpers/schemas';

import {
  fetchSendResetPassword,
  resetSendResetPassword,
  setSendResetPassword,
} from '#store/actions';
import {
  loadingSelector,
  sendResetPasswordErrorSelector,
  sendResetPasswordStatusSelector,
} from '#store/selectors';

import ModalTitle from './ModalTitle';
import {
  CancelButton,
  CancelButtonContainer,
} from './styles';

type Modals =
  'confirmLanding'
  | 'login'
  | 'resendConfirm'
  | 'resetPassword'
  | 'resetPasswordLanding'
  | 'signin';

interface ModalResetPasswordI {
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<Modals | null>>;
}

const initialValues: form.SendResetPasswordI = {
  email: '',
};

const ModalResetPassword = ({
  setCurrentEmail,
  setCurrentModal,
}: ModalResetPasswordI) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      if (!loading) {
        dispatch(fetchSendResetPassword(value));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: allowResetPasswordSchema,
  });
  const loading = useSelector(loadingSelector);
  const sendResetPasswordError = useSelector(sendResetPasswordErrorSelector);
  const sendResetPasswordStatus = useSelector(sendResetPasswordStatusSelector);

  React.useEffect(() => {
    if (sendResetPasswordStatus === 'success') {
      setCurrentEmail(formik.values.email);
      setCurrentModal('resetPasswordLanding');
    }
  }, [sendResetPasswordStatus]);

  React.useEffect(() => () => {
    dispatch(resetSendResetPassword());
  }, []);

  return (
    <Modal.Container
      title={<ModalTitle />}
    >
      <form
        data-testid='form'
        onSubmit={formik.handleSubmit}
      >
        <Field
          disabled={loading}
          error={
            formik.errors.email || sendResetPasswordError.email
          }
          fieldTestId='email'
          id='email'
          label='email'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (sendResetPasswordError.email) {
              dispatch(setSendResetPassword({
                errors: {
                  ...sendResetPasswordError,
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
      <CancelButtonContainer>
        <CancelButton
          onClick={() => {
            if (!loading) {
              setCurrentModal('login');
            }
          }}
        >
          Cancel
        </CancelButton>
      </CancelButtonContainer>
    </Modal.Container>
  );
};

export default ModalResetPassword;
