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

import { fetchSendResetPassword } from '#store/actions';
import {
  loadingSelector,
  sendResetPasswordErrorSelector,
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
  setCurrentModal: React.Dispatch<React.SetStateAction<Modals | null>>;
}

const initialValues = {
  email: '',
};

const ModalResetPassword = ({
  setCurrentModal,
}: ModalResetPasswordI) => {
  const loading = useSelector(loadingSelector);
  const resetPasswordError = useSelector(sendResetPasswordErrorSelector);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (value) => {
      dispatch(fetchSendResetPassword(value));
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: allowResetPasswordSchema,
  });
  return (
    <ModalContainer
      title='Enter your email to reset your password'
    >
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='email'
          error={
            formik.errors.email || resetPasswordError.email
          }
          label='email'
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
