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

import { updateEmail } from '#helpers/schemas';

import {
  putUpdateEmailValidate,
  resetUpdateEmailValidate,
  setUpdateEmailValidate,
} from '#store/actions';
import {
  loadingSelector,
  updateEmailValidateErrorsSelector,
} from '#store/selectors';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

import {
  Container,
  NavLink,
  Title,
} from './styles';

const initialValues: form.UpdateEmailI = {
  password: '',
};

const Updater = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(
          putUpdateEmailValidate({
            ...values,
            confirmToken: `Bearer ${token}`,
          }),
        );
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: updateEmail,
  });
  const { token } = useParams<{ token: string }>();
  const loading = useSelector(loadingSelector);
  const updateEmailValidateErrors = useSelector(updateEmailValidateErrorsSelector);

  React.useEffect(() => () => {
    dispatch(resetUpdateEmailValidate());
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
          error={
            formik.errors.password || updateEmailValidateErrors.password
          }
          fieldTestId='password'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (updateEmailValidateErrors.password) {
              dispatch(
                setUpdateEmailValidate({
                  errors: {
                    ...updateEmailValidateErrors,
                    password: '',
                  },
                }),
              );
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
          title='Update your email'
          type='submit'
        />
      </form>
      <NavLink>
        <Link
          to='/dashboard'
        >
          DASHBOARD
        </Link>
      </NavLink>
    </Container>
  );
};

export default Updater;
