import { useFormik } from 'formik';
import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

import { changeEmailSchema } from '#helpers/schemas';

import { loadingSelector } from '#store/selectors';

const initialValues = {
  password: '',
};

const ChangeEmail = () => {
  const loading = useSelector(loadingSelector);
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: changeEmailSchema,
  });
  return (
    <div>
      <p>
        change your email
      </p>
      <p>
        Enter your password to receive a message on your current adress.
        This message contain a link to update your email.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor="password"
        >
          password
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
          {loading ? 'loading' : 'change your email'}
        </button>
      </form>
    </div>
  );
};

export default ChangeEmail;
