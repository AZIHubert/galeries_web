import * as React from 'react';
import { useFormik } from 'formik';

import { ticketSchema } from '#helpers/schemas';

interface ModalTicketI {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValues = {
  header: '',
  body: '',
};

const ModalTicket = ({ loading, setLoading }: ModalTicketI) => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      if (!loading) { setLoading(true); }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: ticketSchema,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor="header"
        >
          title *
        </label>
        <input
          data-testid='headerField'
          disabled={loading}
          id='header'
          name='header'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='text'
          value={formik.values.header}
        />
        {formik.errors.header
        && formik.touched.header
        && (
          <div
            data-testid='headerError'
          >
            {formik.errors.header}
          </div>
        )}
        <label
          htmlFor="body"
        >
          body *
        </label>
        <input
          data-testid='bodyField'
          disabled={loading}
          id='body'
          name='body'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='text'
          value={formik.values.body}
        />
        {formik.errors.body && formik.touched.body && (
          <div
            data-testid='bodyError'
          >
            {formik.errors.body}
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
          {loading ? 'loading' : 'send'}
        </button>
      </form>
    </div>
  );
};

export default ModalTicket;
