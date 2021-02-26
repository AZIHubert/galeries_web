import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';

import { allowResetPasswordSchema } from '#helpers/schemas';

import {
  fetchSendResetPassword,
  setSendResetPassword,
} from '#store/actions';
import {
  loadingSelector,
  sendResetPasswordErrorSelector,
  sendResetPasswordStatusSelector,
} from '#store/selectors';

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
        resetForm();
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

  React.useEffect(() => () => resetForm(), []);

  const resetForm = () => {
    dispatch(setSendResetPassword({
      errors: initialValues,
      status: 'pending',
    }));
  };

  return (
    <ModalContainer
      title='Enter your email to reset your password'
    >
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='email'
          error={
            formik.errors.email || sendResetPasswordError.email
          }
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
        <GradientButton
          disabled={loading}
          marginBottom={20}
          marginTop={20}
          marginTopL={24}
          type='submit'
          title='Reset'
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
    </ModalContainer>
  );
};

export default ModalResetPassword;
