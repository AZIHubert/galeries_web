import { useFormik } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
} from 'react-router-dom';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

import { changeEmailConfirmSchema } from '#helpers/schemas';

import {
  loadingSelector,
} from '#store/selectors';

import {
  Container,
  NavLink,
  Title,
} from './styles';

const initialValues: form.UpdateEmailConfirmI = {
  password: '',
  email: '',
};

const Updater = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: changeEmailConfirmSchema,
  });
  const loading = useSelector(loadingSelector);

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Text
          styles={{
            marginBottom: 40,
          }}
        >
          Enter your new email adress, a message gonna be send to it.
        </Text>
        <Title>
          Update your email
        </Title>
        <Field
          disabled={loading}
          error={formik.errors.email}
          id='confirmPassword'
          label='new email'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          styles={{
            marginBottom: 12,
          }}
          touched={formik.touched.email}
          type='text'
          value={formik.values.email}
        />
        <Field
          disabled={loading}
          error={formik.errors.password}
          fieldTestId='password'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
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
            marginTop: 25,
          }}
          stylesLaptopL={{
            marginTop: 35,
          }}
          title='update email'
          type='submit'
        />
      </form>
      <NavLink>
        <Link
          to='/desktop'
        >
          DESKTOP
        </Link>
      </NavLink>
    </Container>
  );
};

export default Updater;
