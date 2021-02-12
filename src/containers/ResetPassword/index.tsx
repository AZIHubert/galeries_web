import { useFormik } from 'formik';
import * as React from 'react';
import {
  Link,
  useParams,
  useHistory,
} from 'react-router-dom';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import ModalTimer from '#components/ModalTimer';
import RequiredField from '#components/RequiredField';

import { LoadingContext } from '#contexts/LoadingContext';

import { resetPassword } from '#helpers/api';
import { resetPasswordSchema } from '#helpers/schemas';

import { LogoGaleries } from '#ressources/svgComponents';

import {
  Container,
  Form,
  Logo,
  NavLink,
  Title,
} from './styles';

interface ConfirmAccountI {
  setCallbackModal: React.Dispatch<React.SetStateAction<{
    error: boolean;
    open: boolean;
    text: string;
  }>>
}

const initialValues = {
  confirmPassword: '',
  password: '',
};

const ResetPassword = ({
  setCallbackModal,
}:ConfirmAccountI) => {
  const [errorModal, setErrorModal] = React.useState<{
    open: boolean;
    text: string;
  }>({
    open: false,
    text: '',
  });
  const history = useHistory();
  const { loading, setLoading } = React.useContext(LoadingContext);
  const { token } = useParams<{ token: string }>();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setFieldError }) => {
      if (!loading) {
        setLoading(true);
        try {
          await resetPassword(token, values);
          setCallbackModal((prevState) => ({
            ...prevState,
            text: 'you\'re password has been successfully changed.',
          }));
          history.push('/');
        } catch (err) {
          if (err.response) {
            if (err.status === 500) {
              setErrorModal({
                open: true,
                text: err.response.data.errors,
              });
            } else {
              const { errors } = err.response.data;
              if (typeof errors === 'object') {
                Object.keys(errors).map((error) => setFieldError(error, errors[error]));
              } else {
                setErrorModal({
                  open: true,
                  text: err.response.data.errors,
                });
              }
            }
          }
        }
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: resetPasswordSchema,
  });
  return (
    <Container>
      <Logo>
        <LogoGaleries />
      </Logo>
      <Title>
        Reset password
      </Title>
      <Form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          id='password'
          error={formik.errors.password}
          errorTestId='passwordError'
          fieldTestId='passwordField'
          marginBottom={6}
          marginBottomL={10}
          label='password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <Field
          disabled={loading}
          id='confirmPassword'
          error={formik.errors.confirmPassword}
          errorTestId='confirmPasswordError'
          fieldTestId='confirmPasswordField'
          marginBottom={12}
          label='confirm password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          touched={formik.touched.confirmPassword}
          type='password'
          value={formik.values.confirmPassword}
        />
        <RequiredField />
        <GradientButton
          disabled={loading}
          marginBottom={15}
          marginTop={25}
          marginTopL={35}
          testId='submitButton'
          title='Reset password'
          type='submit'
        />
      </Form>
      <NavLink>
        <Link
          to='/'
        >
          HOME
        </Link>
      </NavLink>
      <ModalTimer
        callBack={() => setErrorModal((prevState) => ({
          ...prevState,
          text: '',
        }))}
        handleClose={() => setErrorModal((prevState) => ({
          ...prevState,
          open: false,
        }))}
        open={errorModal.open}
        text={errorModal.text}
        variant='danger'
      />
    </Container>
  );
};

export default ResetPassword;
