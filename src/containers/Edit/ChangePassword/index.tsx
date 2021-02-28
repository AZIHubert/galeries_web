import * as React from 'react';
import { useFormik } from 'formik';
import {
  useSelector,
} from 'react-redux';

import Field from '#components/Field';
import { changePasswordSchema } from '#helpers/schemas';

import { loadingSelector } from '#store/selectors';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
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
    <div>
      <p>
        change password
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={formik.errors.currentPassword}
          fieldTestId='currentPassword'
          id='currentPassword'
          label='current password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
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
          touched={formik.touched.confirmNewPassword}
          type='password'
          value={formik.values.confirmNewPassword}
        />
        <button
          disabled={loading}
          data-testid='submitButton'
          type='submit'
        >
          {loading ? 'loading' : 'change your password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
