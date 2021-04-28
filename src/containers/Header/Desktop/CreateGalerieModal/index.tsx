import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  useHistory,
} from 'react-router-dom';

import Button from '#components/Button';
import Field from '#components/Field';
import Modal from '#components/Modal';
import RequiredField from '#components/RequiredField';
import Text from '#components/Text';

import {
  createGalerieSchema,
} from '#helpers/schemas';

import {
  postGalerie,
  resetGalerie,
  setGalerie,
} from '#store/actions';
import {
  galeriesSelector,
  loadingSelector,
  galerieStatusSelector,
  galerieErrorSelector,
} from '#store/selectors';

const initialValues = {
  name: '',
};

interface CreateGalerieModalI {
  handleCloseCreateGalerie: () => void;
}

const CreateGalerieModal = ({
  handleCloseCreateGalerie,
}: CreateGalerieModalI) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (!loading) {
        dispatch(postGalerie(values));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: createGalerieSchema,
  });
  const history = useHistory();
  const galerieErrors = useSelector(galerieErrorSelector);
  const galerieStatus = useSelector(galerieStatusSelector);
  const loading = useSelector(loadingSelector);
  const galeries = useSelector(galeriesSelector);

  React.useEffect(() => () => {
    dispatch(resetGalerie());
  }, []);
  React.useEffect(() => {
    if (galerieStatus === 'success') {
      handleCloseCreateGalerie();
      const lastGalerie = Object.keys(galeries).sort(
        (a, b) => (
          new Date(galeries[b].createdAt).getTime()
          - new Date(galeries[a].createdAt).getTime()
        ),
      )[0];
      dispatch(resetGalerie());
      history.push(`/galerie/${lastGalerie}`);
    }
  });

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
            formik.errors.name || galerieErrors.name
          }
          fieldTestId='name'
          id='name'
          label='galerie name'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (galerieErrors.name) {
              dispatch(setGalerie({
                errors: {
                  ...galerieErrors,
                  name: '',
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
          touched={formik.touched.name}
          value={formik.values.name}
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
          title='Create a new galerie'
        />
      </form>
    </Modal.Container>
  );
};

export default CreateGalerieModal;
