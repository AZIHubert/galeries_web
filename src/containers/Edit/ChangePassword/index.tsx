import * as React from 'react';
import { useFormik } from 'formik';
import {
  useSelector,
} from 'react-redux';

import { changePasswordSchema } from '#helpers/schemas';

import { loadingSelector } from '#store/selectors';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ChangePassword = () => {
  const loading = useSelector(loadingSelector);
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: changePasswordSchema,
  });
  return (
    <div>
      <p>
        change password
      </p>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor="currentPassword"
        >
          current password
        </label>
        <input
          data-testid='currentPasswordField'
          disabled={loading}
          id='currentPassword'
          name='currentPassword'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='password'
          value={formik.values.currentPassword}
        />
        {formik.errors.currentPassword
          && formik.touched.currentPassword && (
          <div
            data-testid='currentPasswordError'
          >
            {formik.errors.currentPassword}
          </div>
        )}
        <label
          htmlFor="newPassword"
        >
          new password
        </label>
        <input
          data-testid='newPasswordField'
          disabled={loading}
          id='newPassword'
          name='newPassword'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='password'
          value={formik.values.newPassword}
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div
            data-testid='newPasswordError'
          >
            {formik.errors.newPassword}
          </div>
        )}
        <label
          htmlFor="confirmNewPassword"
        >
          confirm new password
        </label>
        <input
          data-testid='confirmNewPasswordField'
          disabled={loading}
          id='confirmNewPassword'
          name='confirmNewPassword'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='password'
          value={formik.values.confirmNewPassword}
        />
        {formik.errors.confirmNewPassword
          && formik.touched.confirmNewPassword && (
          <div
            data-testid='confirmNewPasswordError'
          >
            {formik.errors.confirmNewPassword}
          </div>
        )}
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
