import { useFormik } from 'formik';
import * as React from 'react';

import { resetPasswordSchema } from '#helpers/schemas';

interface ModalForgotPasswordI {
  loading: boolean;
  setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  email: '',
};

const ModalForgotPassword = ({
  loading,
  setForgotPassword,
  setLoading,
}: ModalForgotPasswordI) => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      if (!loading) { setLoading(true); }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: resetPasswordSchema,
  });
  return (
    <div
      data-testid="modalForgotPassword"
    >
      <p>
      Enter your email to reset
      your password
      </p>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor="email"
        >
          email
        </label>
        <input
          data-testid='emailField'
          disabled={loading}
          id='email'
          name='email'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='text'
          value={formik.values.email}
        />
        {formik.errors.email
        && formik.touched.email
        && (
          <div
            data-testid='emailError'
          >
            {formik.errors.email}
          </div>
        )}
        <button
          disabled={loading}
          data-testid='submitButton'
          type='submit'
        >
          {loading ? 'loading' : 'reset'}
        </button>
      </form>
      <button
        data-testid='cancelButton'
        onClick={() => {
          if (!loading) {
            setForgotPassword(false);
          }
        }}
      >
      cancel
      </button>
    </div>
  );
};

export default ModalForgotPassword;
