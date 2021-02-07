import * as React from 'react';
import { useFormik } from 'formik';

import FacebookButton from '#components/FacebookButton';
import GoogleButton from '#components/GoogleButton';
import { signinSchema } from '#helpers/schemas';

interface ModalSigninI {
  loading: boolean;
  setAccountCreate:React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentEmail: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  switchModal: () => void;
}

const initialValues = {
  confirmPassword: '',
  email: '',
  password: '',
  userName: '',
};

const ModalSignin = ({
  loading,
  setAccountCreate,
  setLoading,
  switchModal,
  setCurrentEmail,
}: ModalSigninI) => {
  const formik = useFormik({
    initialValues,
    onSubmit: ({ email }) => {
      if (!loading) {
        setLoading(true);
        setCurrentEmail(email);
        setAccountCreate(true);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: signinSchema,
  });

  return (
    <div
      data-testid='modalSignin'
    >
      <FacebookButton
        loading={loading}
        setLoading={setLoading}
        type={'signin'}
      />
      <GoogleButton
        loading={loading}
        setLoading={setLoading}
        type={'signin'}
      />
      <div>
        or
      </div>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor="userName"
        >
          user name *
        </label>
        <input
          data-testid='userNameField'
          disabled={loading}
          id='userName'
          name='userName'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='text'
          value={formik.values.userName}
        />
        {formik.errors.userName && formik.touched.userName && (
          <div
            data-testid='userNameError'
          >
            {formik.errors.userName}
          </div>
        )}
        <label
          htmlFor="email"
        >
          email *
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
        {formik.errors.email && formik.touched.email && (
          <div
            data-testid='emailError'
          >
            {formik.errors.email}
          </div>
        )}
        <label htmlFor="password">
          password *
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
          </div>
        )}
        <label
          htmlFor="confirmPassword"
        >
          confirm password *
        </label>
        <input
          data-testid='confirmPasswordField'
          disabled={loading}
          id='confirmPassword'
          name='confirmPassword'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='password'
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <div
            data-testid='confirmPasswordError'
          >
            {formik.errors.confirmPassword}
          </div>
        )}
        <div>
          * Required field
        </div>
        <button
          disabled={loading}
          data-testid='submitButton'
          type='submit'
        >
          {loading ? 'loading' : 'signin'}
        </button>
      </form>
      <p>
        You already have an account? click
      </p>
      <button
        disabled={loading}
        data-testid='switchToLogin'
        onClick={switchModal}
      >
        here
      </button>
      <p>
        .
      </p>
    </div>
  );
};

export default ModalSignin;
