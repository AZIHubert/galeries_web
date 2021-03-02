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

import {
  fetchSendTicket,
  resetSendTicket,
  setSendTicket,
} from '#store/actions';
import {
  loadingSelector,
  sendTicketErrorSelector,
  sendTicketStatusSelector,
} from '#store/selectors';

const initialValues: form.SendTicketI = {
  body: '',
  header: '',
};

interface ModalTicketI {
  handleClose: () => void;
}

const ModalTicket = ({
  handleClose,
}: ModalTicketI) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (value) => {
      if (!loading) {
        resetForm();
        dispatch(fetchSendTicket(value));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: ticketSchema,
  });
  const loading = useSelector(loadingSelector);
  const sendTicketError = useSelector(sendTicketErrorSelector);
  const sendTicketStatus = useSelector(sendTicketStatusSelector);

  React.useEffect(() => () => resetForm(), []);
  React.useEffect(() => {
    if (sendTicketStatus === 'success') {
      handleClose();
    }
  }, [sendTicketStatus]);

  const resetForm = () => {
    dispatch(resetSendTicket());
  };

  return (
    <ModalContainer
      title='Send a ticket'
      titleMarginTop={20}
      titleTextAlign='center'
    >
      <form
        data-testid='form'
        onSubmit={formik.handleSubmit}
      >
        <Field
          disabled={loading}
          fieldTestId='header'
          error={
            formik.errors.header || sendTicketError.header
          }
          id='header'
          marginBottom={6}
          marginBottomL={10}
          label='title'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (sendTicketError.header) {
              dispatch(setSendTicket({
                errors: {
                  ...sendTicketError,
                  header: '',
                },
              }));
            }
          }}
          required
          touched={formik.touched.header}
          value={formik.values.header}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.body || sendTicketError.body
          }
          fieldTestId='body'
          id='body'
          marginBottom={12}
          marginBottomL={15}
          multiline
          label='body'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (sendTicketError.body) {
              dispatch(setSendTicket({
                errors: {
                  ...sendTicketError,
                  body: '',
                },
              }));
            }
          }}
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
