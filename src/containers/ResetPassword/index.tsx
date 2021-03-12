import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom';

import Field from '#components/Field';
import FullPageForm from '#components/FullPageForm';
import Button from '#components/Button';
import RequiredField from '#components/RequiredField';

import { resetPasswordSchema } from '#helpers/schemas';

import {
  fetchResetPassword,
  resetResetPassword,
  setResetPassword,
} from '#store/actions';
import {
  resetPasswordErrorSelector,
  resetPasswordStatusSelector,
  loadingSelector,
} from '#store/selectors';

import {
  Form,
  NavLink,
  Title,
} from './styles';

const initialValues: form.ResetPasswordI = {
  confirmPassword: '',
  password: '',
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(fetchResetPassword({
          ...values,
          confirmToken: `Bearer ${token}`,
        }));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: resetPasswordSchema,
  });
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const loading = useSelector(loadingSelector);
  const resetPasswordError = useSelector(resetPasswordErrorSelector);
  const resetPasswordStatus = useSelector(resetPasswordStatusSelector);

  React.useEffect(() => {
    if (resetPasswordStatus === 'success') {
      history.push('/');
    }
  }, [resetPasswordStatus]);

  React.useEffect(() => () => {
    dispatch(resetResetPassword());
  }, []);

  return (
    <FullPageForm>
      <Title>
        Reset password
      </Title>
      <Form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={
            formik.errors.password || resetPasswordError.password
          }
          fieldTestId='password'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (resetPasswordError.password) {
              dispatch(setResetPassword({
                errors: {
                  ...resetPasswordError,
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
            formik.errors.confirmPassword || resetPasswordError.confirmPassword
          }
          fieldTestId='confirmPassword'
          id='confirmPassword'
          label='confirm password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (resetPasswordError.confirmPassword) {
              dispatch(setResetPassword({
                errors: {
                  ...resetPasswordError,
                  confirmPassword: '',
                },
              }));
            }
          }}
          required
          styles={{
            marginBottom: 12,
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
            marginTop: 25,
          }}
          stylesLaptopL={{
            marginTop: 35,
          }}
          title='Reset password'
          type='submit'
        />
      </Form>
      <NavLink>
        <Link
          to='/'
        >
          HOME
        </Link>
      </NavLink>
    </FullPageForm>
  );
};

export default ResetPassword;
