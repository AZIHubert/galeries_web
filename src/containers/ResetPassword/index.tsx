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
import GradientButton from '#components/GradientButton';
import RequiredField from '#components/RequiredField';

import { resetPasswordSchema } from '#helpers/schemas';

import { LogoGaleries } from '#ressources/svgComponents';

import {
  fetchResetPassword,
  setResetPassword,
} from '#store/actions';
import {
  resetPasswordErrorSelector,
  resetPasswordStatusSelector,
  loadingSelector,
} from '#store/selectors';

import {
  Container,
  Form,
  Logo,
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
        resetForm();
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

  React.useEffect(() => () => resetForm(), []);

  const resetForm = () => {
    dispatch(setResetPassword({
      errors: initialValues,
      status: 'pending',
    }));
  };

  return (
    <Container>
      <Logo>
        <LogoGaleries />
      </Logo>
      <Title>
        Reset password
      </Title>
      <Form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={
            formik.errors.password || resetPasswordError.password
          }
          id='password'
          marginBottom={6}
          marginBottomL={10}
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
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.confirmPassword || resetPasswordError.confirmPassword
          }
          id='confirmPassword'
          marginBottom={12}
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
          touched={formik.touched.confirmPassword}
          type='password'
          value={formik.values.confirmPassword}
        />
        <RequiredField />
        <GradientButton
          disabled={loading}
          marginBottom={15}
          marginTop={25}
          marginTopL={35}
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
    </Container>
  );
};

export default ResetPassword;
