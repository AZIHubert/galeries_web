import { useFormik } from 'formik';
import * as React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';

import { changePasswordSchema } from '#helpers/schemas';

import {
  putUpdatePassword,
  setUpdatePassword,
} from '#store/actions';
import {
  loadingSelector,
  updatePasswordErrorsselector,
  updatePasswordStatusSelector,
} from '#store/selectors';

const initialValues = {
  confirmNewPassword: '',
  currentPassword: '',
  newPassword: '',
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(putUpdatePassword(values));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: changePasswordSchema,
  });
  const loading = useSelector(loadingSelector);
  const updatePasswordErrors = useSelector(updatePasswordErrorsselector);
  const updatePasswordStatus = useSelector(updatePasswordStatusSelector);

  React.useEffect(() => {
    if (updatePasswordStatus === 'success') {
      formik.resetForm({
        values: initialValues,
      });
    }
  }, [updatePasswordStatus]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field
        disabled={loading}
        error={
          formik.errors.currentPassword || updatePasswordErrors.currentPassword
        }
        fieldTestId='currentPassword'
        id='currentPassword'
        label='current password'
        onBlur={formik.handleBlur}
        onChange={(e) => {
          formik.handleChange(e);
          if (updatePasswordErrors.currentPassword) {
            dispatch(
              setUpdatePassword({
                errors: {
                  ...updatePasswordErrors,
                  currentPassword: '',
                },
              }),
            );
          }
        }}
        required
        styles={{
          marginBottom: 15,
        }}
        touched={formik.touched.currentPassword}
        type='password'
        value={formik.values.currentPassword}
      />
      <Field
        disabled={loading}
        error={formik.errors.newPassword}
        fieldTestId='newPassword'
        id='newPassword'
        label='new password'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        required
        styles={{
          marginBottom: 15,
        }}
        touched={formik.touched.newPassword}
        type='password'
        value={formik.values.newPassword}
      />
      <Field
        disabled={loading}
        error={formik.errors.confirmNewPassword}
        fieldTestId='confirmNewPassword'
        id='confirmNewPassword'
        label='confirm new password'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        required
        styles={{
          marginBottom: 25,
        }}
        touched={formik.touched.confirmNewPassword}
        type='password'
        value={formik.values.confirmNewPassword}
      />
      <RequiredField />
      <Button.Gradiant
        disabled={loading}
        styles={{
          marginTop: 20,
        }}
        type='submit'
        title='change your password'
      />
    </form>
  );
};

export default ChangePassword;
