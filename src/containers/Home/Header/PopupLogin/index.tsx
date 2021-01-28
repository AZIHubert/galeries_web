import * as React from 'react';
import { useFormik } from 'formik';

import FacebookButton from '#components/FacebookButton';
import GoogleButton from '#components/GoogleButton';
import { loginSchema } from '#helpers/schemas';

interface PopupLoginI {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  userNameOrEmail: '',
  password: '',
};

const PopupLogin = ({ loading, setLoading }: PopupLoginI) => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      if (!loading) { setLoading(true); }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: loginSchema,
  });

  return (
    <div>
      <FacebookButton
        loading={loading}
        setLoading={setLoading}
        type={'login'}
      />
      <GoogleButton
        loading={loading}
        setLoading={setLoading}
        type={'login'}
      />
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="userNameOrEmail">
        user name or email
        </label>
        <input
          data-testid='userNameOrEmailField'
          disabled={loading}
          id='userNameOrEmail'
          name='userNameOrEmail'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='text'
          value={formik.values.userNameOrEmail}
        />
        {formik.errors.userNameOrEmail
        && formik.touched.userNameOrEmail
        && (
          <div
            data-testid='userNameOrEmailError'
          >
            {formik.errors.userNameOrEmail}
          </div>)
        }
        <label htmlFor="password">
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
        {formik.errors.password && formik.touched.password && (
          <div
            data-testid='passwordError'
          >
            {formik.errors.password}
          </div>)
        }
        <button
          disabled={loading}
          data-testid='submitButton'
          type='submit'
        >
          {loading ? 'loading' : 'signin'}
        </button>
      </form>
    </div>
  );
};

export default PopupLogin;
