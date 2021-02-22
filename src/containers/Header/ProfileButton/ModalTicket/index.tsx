import { useFormik } from 'formik';
import * as React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalContainer from '#components/ModalContainer';
import RequiredField from '#components/RequiredField';

import { ticketSchema } from '#helpers/schemas';

import { loadingSelector } from '#store/selectors';

import { fetchSendTicket } from '#store/actions';

const initialValues = {
  header: '',
  body: '',
};

const ModalTicket = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const formik = useFormik({
    initialValues,
    onSubmit: (value) => {
      if (!loading) {
        dispatch(fetchSendTicket(value));
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: ticketSchema,
  });
  return (
    <ModalContainer
      data-testid='ticketModal'
      title='Send a ticket'
      titleMarginTop={20}
      titleTextAlign='center'
    >
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='header'
          error={formik.errors.header}
          errorTestId='headerError'
          fieldTestId='headerField'
          marginBottom={6}
          marginBottomL={10}
          label='title'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.header}
          value={formik.values.header}
        />
        <Field
          disabled={loading}
          id='body'
          error={formik.errors.body}
          errorTestId='bodyError'
          fieldTestId='bodyField'
          marginBottom={12}
          marginBottomL={15}
          multiline
          label='body'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.body}
          value={formik.values.body}
        />
        <RequiredField />
        <GradientButton
          disabled={loading}
          marginBottom={15}
          marginBottomL={22}
          marginTop={15}
          marginTopL={22}
          testId='submitButton'
          type='submit'
          title='send'
        />
      </form>
    </ModalContainer>
  );
};

export default ModalTicket;
