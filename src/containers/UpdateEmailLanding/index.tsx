import { useFormik } from 'formik';
import * as React from 'react';
import {
  useSelector,
} from 'react-redux';
import {
  Link,
} from 'react-router-dom';

import Button from '#components/Button';
import Field from '#components/Field';
import FullPageForm from '#components/FullPageForm';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

import { updateEmail } from '#helpers/schemas';

import {
  loadingSelector,
  userSelector,
} from '#store/selectors';

import {
  Container,
  NavLink,
  Title,
} from './styles';

const initialValues: form.UpdateEmailI = {
  password: '',
};

const UpdateEmailLanding = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: async () => {},
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: updateEmail,
  });
  const loading = useSelector(loadingSelector);
  const user = useSelector(userSelector);

  return (
    <FullPageForm>
      <Container>
        <Text
          fontStyle='italic'
          styles={{
            fontSize: 0.9,
            marginBottom: 40,
          }}
        >
          Enter your password to change your email
        </Text>
        <Title>
          Change your email
        </Title>
        <form
          onSubmit={formik.handleSubmit}
        >
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
              marginTop: 15,
            }}
            stylesLaptopL={{
              marginBottom: 22,
              marginTop: 22,
            }}
            title='Update your email'
            type='submit'
          />
        </form>
        <NavLink>
          <Link
            to={!user ? '/' : '/dashboard'}
          >
            {!user ? 'HOME' : 'DASHBOARD'}
          </Link>
        </NavLink>
      </Container>
    </FullPageForm>
  );
};

export default UpdateEmailLanding;
