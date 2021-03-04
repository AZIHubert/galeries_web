import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import Modal from '#components/Modal';
import RequiredField from '#components/RequiredField';
import TextSepatator from '#components/TextSeparator';

import { signinSchema } from '#helpers/schemas';

import {
  fetchSignin,
  resetSignin,
  setSignin,
} from '#store/actions';
import {
  loadingSelector,
  signinErrorSelector,
  signinStatusSelector,
} from '#store/selectors';

interface ModalSigninI {
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setCurrentModal: React.Dispatch<React.SetStateAction<HeaderModals | null>>;
}

const initialValues: form.SigninI = {
  confirmPassword: '',
  email: '',
  password: '',
  userName: '',
};

const ModalSignin = ({
  setCurrentEmail,
  setCurrentModal,
}: ModalSigninI) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (!loading) {
        resetForm();
        dispatch(fetchSignin(values));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: signinSchema,
  });
  const loading = useSelector(loadingSelector);
  const signinError = useSelector(signinErrorSelector);
  const signinStatus = useSelector(signinStatusSelector);

  React.useEffect(() => {
    if (signinStatus === 'success') {
      setCurrentEmail(formik.values.email);
      setCurrentModal('confirmLanding');
    }
  }, [signinStatus]);
  React.useEffect(() => () => resetForm(), []);

  const resetForm = () => {
    dispatch(resetSignin());
  };

  return (
    <Modal.Container
      containerTestId='signin'
    >
      <Button.Facebook
        action='signin'
      />
      <Button.Google
        action='signin'
      />
      <TextSepatator
        styles={{
          marginBottom: 9,
          marginTop: 9,
        }}
        stylesLaptopL={{
          marginBottom: 16,
          marginTop: 16,
        }}
        text='or'
      />
      <form
        onSubmit={formik.handleSubmit}
        data-testid='form'
      >
        <Field
          disabled={loading}
          error={
            formik.errors.userName || signinError.userName
          }
          fieldTestId='userName'
          id='userName'
          label='user name'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (signinError.userName) {
              dispatch(setSignin({
                errors: {
                  ...signinError,
                  userName: '',
                },
              }));
            }
          }}
          required
          styles={{
            marginBottom: 6,
          }}
          stylesLaptopL={{
            marginBottom: 10,
          }}
          touched={formik.touched.userName}
          value={formik.values.userName}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.email || signinError.email
          }
          fieldTestId='email'
          id='email'
          label='email'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (signinError.email) {
              dispatch(setSignin({
                errors: {
                  ...signinError,
                  email: '',
                },
              }));
            }
          }}
          required
          styles={{
            marginBottom: 6,
          }}
          stylesLaptopL={{
            marginBottom: 10,
          }}
          touched={formik.touched.email}
          value={formik.values.email}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.password || signinError.password
          }
          fieldTestId='password'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (signinError.password) {
              dispatch(setSignin({
                errors: {
                  ...signinError,
                  password: '',
                },
              }));
            }
          }}
          required
          styles={{
            marginBottom: 6,
          }}
          stylesLaptopL={{
            marginBottom: 10,
          }}
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.confirmPassword || signinError.confirmPassword
          }
          fieldTestId='confirmPassword'
          id='confirmPassword'
          label='confirm password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (signinError.confirmPassword) {
              dispatch(setSignin({
                errors: {
                  ...signinError,
                  confirmPassword: '',
                },
              }));
            }
          }}
          required
          styles={{
            marginBottom: 12,
          }}
          stylesLaptopL={{
            marginBottom: 15,
          }}
          touched={formik.touched.confirmPassword}
          type='password'
          value={formik.values.confirmPassword}
        />
        <RequiredField />
        <Button.Gradiant
          disabled={loading}
          styles={{
            marginBottom: 15,
            marginTop: 15,
          }}
          stylesLaptopL={{
            marginBottom: 22,
            marginTop: 22,
          }}
          type='submit'
          title='Sign in'
        />
      </form>
      <Button.Text
        disabled={loading}
        onClick={() => setCurrentModal('login')}
        styles={{
          fontSize: 0.65,
          justifyContent: 'center',
        }}
        stylesLaptopL={{
          fontSize: 0.8,
        }}
        text='You already have an account? click'
        textButton='here'
      />
    </Modal.Container>
  );
};

export default ModalSignin;
