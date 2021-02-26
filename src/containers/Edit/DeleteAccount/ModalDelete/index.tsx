import { useFormik } from 'formik';
import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

import { deleteAccountSchema } from '#helpers/schemas';

import { loadingSelector } from '#store/selectors';

const initialValues = {
  password: '',
};

const ModalDelete = () => {
  const loading = useSelector(loadingSelector);
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: deleteAccountSchema,
  });
  return (
    <div
      data-testid='deleteModal'
    >
      <p>
        Are you sure you want
        to do this?
      </p>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor="password"
        >
          confirm yout password
        </label>
        <input
          data-testid='passwordField'
          disabled={loading}
          id='password'
          name='password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='password'
          value={formik.values.password}
        />
        {formik.errors.password
        && formik.touched.password && (
          <div
            data-testid='passwordError'
          >
            {formik.errors.password}
          </div>
        )}
        <button
          disabled={loading}
          data-testid='submitButton'
          type='submit'
        >
          {loading ? 'loading' : 'delete your account'}
        </button>
      </form>
    </div>
  );
};

export default ModalDelete;
