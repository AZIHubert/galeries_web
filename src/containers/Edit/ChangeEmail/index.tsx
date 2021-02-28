import { useFormik } from 'formik';
import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

import { changeEmailSchema } from '#helpers/schemas';
import { loadingSelector } from '#store/selectors';
import Field from '#components/Field';

const initialValues = {
  password: '',
};

const ChangeEmail = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: changeEmailSchema,
  });
  const loading = useSelector(loadingSelector);
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
        <Field
          disabled={loading}
          error={formik.errors.password}
          fieldTestId='field'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <button
          disabled={loading}
          type='submit'
        >
          {loading ? 'loading' : 'change your email'}
        </button>
      </form>
    </div>
  );
};

export default ChangeEmail;
