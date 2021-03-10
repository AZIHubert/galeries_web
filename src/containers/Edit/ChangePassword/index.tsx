import { useFormik } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';

import { changePasswordSchema } from '#helpers/schemas';

import { loadingSelector } from '#store/selectors';

const initialValues = {
  confirmNewPassword: '',
  currentPassword: '',
  newPassword: '',
};

const ChangePassword = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: changePasswordSchema,
  });
  const loading = useSelector(loadingSelector);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field
        disabled={loading}
        error={formik.errors.currentPassword}
        fieldTestId='currentPassword'
        id='currentPassword'
        label='current password'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
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
