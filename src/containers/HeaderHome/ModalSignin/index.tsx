import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import ModalContainer from '#components/ModalContainer';
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
    <ModalContainer
      containerTestId='signin'
    >
      <Button.Facebook
        action='signin'
      />
      <Button.Google
        action='signin'
      />
      <TextSepatator
        marginBottom={9}
        marginBottomL={16}
        marginTop={9}
        marginTopL={16}
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
          marginBottom={6}
          marginBottomL={10}
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
          marginBottom={6}
          marginBottomL={10}
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
          marginBottom={6}
          marginBottomL={10}
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
          marginBottom={12}
          marginBottomL={15}
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
          touched={formik.touched.confirmPassword}
          type='password'
          value={formik.values.confirmPassword}
        />
        <RequiredField />
        <Button.Gradiant
          disabled={loading}
          marginBottom={15}
          marginBottomL={22}
          marginTop={15}
          marginTopL={22}
          type='submit'
          title='Sign in'
        />
      </form>
      <Button.Text
        disabled={loading}
        fontSize={0.65}
        fontSizeL={0.8}
        justifyContent='center'
        onClick={() => setCurrentModal('login')}
        text='You already have an account? click'
        textButton='here'
      />
    </ModalContainer>
  );
};

export default ModalSignin;
