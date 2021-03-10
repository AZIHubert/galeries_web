import { useFormik } from 'formik';
import * as React from 'react';
import { useSelector } from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

import { changeEmailSchema } from '#helpers/schemas';

import { loadingSelector } from '#store/selectors';

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
      <Text
        styles={{
          fontSize: 0.8,
          marginBottom: 20,
        }}
      >
        Enter your password to receive a message on your current adress.
        This message contain a link to update your email.
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={formik.errors.password}
          fieldTestId='field'
          id='password'
          label='password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          styles={{
            marginBottom: 25,
          }}
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <RequiredField />
        <Button.Gradiant
          disabled={loading}
          styles={{
            marginTop: 20,
          }}
          type='submit'
          title='change your email'
        />
      </form>
    </div>
  );
};

export default ChangeEmail;
