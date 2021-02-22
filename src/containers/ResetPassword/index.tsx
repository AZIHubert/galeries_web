import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Link,
  useParams,
} from 'react-router-dom';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import RequiredField from '#components/RequiredField';

import { resetPasswordSchema } from '#helpers/schemas';

import { LogoGaleries } from '#ressources/svgComponents';

import { fetchResetPassword } from '#store/actions';
import {
  resetPasswordErrorSelector,
  uiSelector,
} from '#store/selectors';

import {
  Container,
  Form,
  Logo,
  NavLink,
  Title,
} from './styles';

const initialValues = {
  confirmPassword: '',
  password: '',
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector(uiSelector);
  const resetPasswordError = useSelector(resetPasswordErrorSelector);
  const { token } = useParams<{ token: string }>();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      dispatch(fetchResetPassword({
        ...values,
        confirmationToken: token,
      }));
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: resetPasswordSchema,
  });
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
          id='password'
          error={
            formik.errors.password || resetPasswordError.password
          }
          marginBottom={6}
          marginBottomL={10}
          label='password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <Field
          disabled={loading}
          id='confirmPassword'
          error={
            formik.errors.confirmPassword || resetPasswordError.confirmPassword
          }
          marginBottom={12}
          label='confirm password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
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
