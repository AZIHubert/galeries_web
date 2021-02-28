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

import { fetchSendTicket } from '#store/actions';
import { loadingSelector } from '#store/selectors';

const initialValues: form.SendTicketI = {
  body: '',
  header: '',
};

const ModalTicket = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (value) => {
      if (!loading) dispatch(fetchSendTicket(value));
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: ticketSchema,
  });
  const loading = useSelector(loadingSelector);

  return (
    <ModalContainer
      title='Send a ticket'
      titleMarginTop={20}
      titleTextAlign='center'
    >
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          fieldTestId='header'
          error={formik.errors.header}
          id='header'
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
          error={formik.errors.body}
          fieldTestId='body'
          id='body'
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
          type='submit'
          title='send'
        />
      </form>
    </ModalContainer>
  );
};

export default ModalTicket;
