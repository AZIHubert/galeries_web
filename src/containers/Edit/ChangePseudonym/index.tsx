import { useFormik } from 'formik';
import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';

import { pseudonymSchema } from '#helpers/schemas';

import {
  loadingSelector,
} from '#store/selectors';

const initialValues: form.PseudonymI = {
  pseudonym: '',
};

const ChangePeudonym = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: pseudonymSchema,
  });
  const loading = useSelector(loadingSelector);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={
            formik.errors.pseudonym
          }
          fieldTestId='field'
          id='pseudonym'
          label='pseudonym'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          styles={{
            marginBottom: 25,
          }}
          touched={formik.touched.pseudonym}
          type='text'
          value={formik.values.pseudonym}
        />
        <RequiredField />
        <Button.Gradiant
          disabled={loading}
          styles={{
            marginTop: 20,
          }}
          type='submit'
          title='change your pseudonym'
        />
      </form>
    </div>
  );
};

export default ChangePeudonym;
