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

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

import { changeEmailConfirmSchema } from '#helpers/schemas';

import {
  postUpdateEmailConfirm,
  resetUpdateEmailConfirm,
  setUpdateEmailConfirm,
} from '#store/actions';
import {
  loadingSelector,
  updateEmailConfirmErrorsSelector,
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
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(
          postUpdateEmailConfirm({
            ...values,
            confirmToken: `Bearer ${token}`,
          }),
        );
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: changeEmailConfirmSchema,
  });
  const loading = useSelector(loadingSelector);
  const updateEmailConfirmErrors = useSelector(updateEmailConfirmErrorsSelector);
  const { token } = useParams<{ token: string }>();

  React.useEffect(() => () => {
    dispatch(resetUpdateEmailConfirm());
  }, []);

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
          error={
            formik.errors.email || updateEmailConfirmErrors.email
          }
          id='email'
          label='new email'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (updateEmailConfirmErrors.email) {
              dispatch(setUpdateEmailConfirm({
                errors: {
                  ...updateEmailConfirmErrors,
                  email: '',
                },
              }));
            }
          }}
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
          error={
            formik.errors.password || updateEmailConfirmErrors.password
          }
          fieldTestId='password'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (updateEmailConfirmErrors.password) {
              dispatch(setUpdateEmailConfirm({
                errors: {
                  ...updateEmailConfirmErrors,
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
