import { useFormik } from 'formik';
import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

import Field from '#components/Field';

import { deleteAccountSchema } from '#helpers/schemas';

import { loadingSelector } from '#store/selectors';

const initialValues = {
  password: '',
};

const ModalDelete = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: deleteAccountSchema,
  });
  const loading = useSelector(loadingSelector);
  return (
    <div>
      <p>
        Are you sure you want to do this?
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={formik.errors.password}
          fieldTestId='field'
          id='password'
          label='confirm your password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
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
