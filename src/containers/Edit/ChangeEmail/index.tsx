import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

import { changeEmailSchema } from '#helpers/schemas';

import {
  postUpdateEmail,
  setUpdateEmail,

} from '#store/actions';
import {
  loadingSelector,
  updateEmailErrorSelector,
  updateEmailStatusSelector,
} from '#store/selectors';

const initialValues = {
  password: '',
};

const ChangeEmail = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(postUpdateEmail(values));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: changeEmailSchema,
  });
  const loading = useSelector(loadingSelector);
  const updateEmailError = useSelector(updateEmailErrorSelector);
  const updateEmailStatus = useSelector(updateEmailStatusSelector);

  React.useEffect(() => {
    if (updateEmailStatus === 'success') {
      formik.resetForm({
        values: initialValues,
      });
    }
  }, [updateEmailStatus]);

  return (
    <div>
      <Text
        styles={{
          fontSize: 0.8,
          marginBottom: 20,
        }}
      >
        Enter your password to receive a message on your current adress.
        This message contain a link to update your email.
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={
            formik.errors.password || updateEmailError.password
          }
          fieldTestId='field'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (updateEmailError.password) {
              dispatch(
                setUpdateEmail({
                  errors: {
                    ...updateEmailError,
                    password: '',
                  },
                }),
              );
            }
          }}
          required
          styles={{
            marginBottom: 25,
          }}
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <RequiredField />
        <Button.Gradiant
          disabled={loading}
          styles={{
            marginTop: 20,
          }}
          type='submit'
          title='change your email'
        />
      </form>
    </div>
  );
};

export default ChangeEmail;
