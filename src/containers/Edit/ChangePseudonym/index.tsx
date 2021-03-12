import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import RequiredField from '#components/RequiredField';

import { pseudonymSchema } from '#helpers/schemas';

import {
  putPseudonym,
  setPseudonym,
} from '#store/actions';
import {
  loadingSelector,
  pseudonymErrorsSelector,
  pseudonymStatusSelector,
} from '#store/selectors';

const initialValues: form.PseudonymI = {
  pseudonym: '',
};

const ChangePeudonym = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(
          putPseudonym(values),
        );
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: pseudonymSchema,
  });
  const pseudonymErrors = useSelector(pseudonymErrorsSelector);
  const pseudonymStatus = useSelector(pseudonymStatusSelector);
  const loading = useSelector(loadingSelector);

  React.useEffect(() => {
    if (pseudonymStatus === 'success') {
      formik.resetForm({
        values: initialValues,
      });
    }
  }, [pseudonymStatus]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={
            formik.errors.pseudonym || pseudonymErrors.pseudonym
          }
          fieldTestId='field'
          id='pseudonym'
          label='pseudonym'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (pseudonymErrors.pseudonym) {
              dispatch(
                setPseudonym({
                  errors: {
                    ...pseudonymErrors,
                    pseudonym: '',
                  },
                }),
              );
            }
          }}
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
