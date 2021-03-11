import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Link,
} from 'react-router-dom';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

import { loginSchema } from '#helpers/schemas';

import {
  fetchLogin,
  resetLogin,
  setLogin,
} from '#store/actions';
import {
  loadingSelector,
  loginErrorSelector,
} from '#store/selectors';

import {
  Container,
  NavLink,
  Title,
} from './styles';

const initialValues: form.LoginI = {
  password: '',
  userNameOrEmail: '',
};

const Logger = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(fetchLogin(values));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: loginSchema,
  });
  const loading = useSelector(loadingSelector);
  const loginError = useSelector(loginErrorSelector);

  React.useEffect(() => () => {
    dispatch(resetLogin());
  }, []);

  return (
    <Container>
      <Text
        fontStyle='italic'
        styles={{
          fontSize: 0.9,
          marginBottom: 40,
        }}
      >
        You should be logged in to register your email
      </Text>
      <Title>
        Log in
      </Title>
      <form
        data-testid='form'
        onSubmit={formik.handleSubmit}
      >
        <Field
          disabled={loading}
          error={
            formik.errors.userNameOrEmail || loginError.userNameOrEmail
          }
          fieldTestId='userNameOrEmail'
          id='userNameOrEmail'
          label='user name or email'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (loginError.userNameOrEmail) {
              dispatch(setLogin({
                errors: {
                  ...loginError,
                  userNameOrEmail: '',
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
          touched={formik.touched.userNameOrEmail}
          value={formik.values.userNameOrEmail}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.password || loginError.password
          }
          fieldTestId='password'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (loginError.password) {
              dispatch(setLogin({
                errors: {
                  ...loginError,
                  password: '',
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
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
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
          testId='button'
          title='Log in'
          type='submit'
        />
      </form>
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

export default Logger;
