import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Field from '#components/Field';
import Button from '#components/Button';
import Modal from '#components/Modal';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

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

  React.useEffect(() => () => {
    dispatch(resetSendTicket());
  }, []);
  React.useEffect(() => {
    if (sendTicketStatus === 'success') {
      handleClose();
    }
  }, [sendTicketStatus]);

  return (
    <Modal.Container>
      <Text
        color='primary'
        styles={{
          fontSize: 1.2,
          marginBottom: 20,
          textAlign: 'center',
        }}
        stylesMobile={{
          fontSize: 1.4,
        }}
        stylesLaptopL={{
          fontSize: 1.5,
        }}
      >
        Create galerie
      </Text>
      <form
        data-testid='form'
        onSubmit={formik.handleSubmit}
      >
        <Field
          disabled={loading}
          error={
            formik.errors.header || sendTicketError.header
          }
          fieldTestId='header'
          id='header'
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
          styles={{
            marginBottom: 6,
          }}
          stylesLaptopL={{
            marginBottom: 10,
          }}
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
          styles={{
            marginBottom: 12,
          }}
          stylesLaptopL={{
            marginBottom: 15,
          }}
          touched={formik.touched.body}
          value={formik.values.body}
        />
        <RequiredField />
        <Button.Gradiant
          disabled={loading}
          styles={{
            marginBottom: 15,
            marginTop: 15,
          }}
          stylesLaptopL={{
            marginBottom: 22,
            marginTop: 22,
          }}
          type='submit'
          title='send'
        />
      </form>
    </Modal.Container>
  );
};

export default ModalTicket;
