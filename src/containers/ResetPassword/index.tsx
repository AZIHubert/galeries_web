import { useFormik } from 'formik';
import styled from 'styled-components';
import {
  Link,
  useParams,
  useHistory,
} from 'react-router-dom';

import * as React from 'react';

import Field from '#components/Field';
import GradientButton from '#components/GradientButton';
import RequiredField from '#components/RequiredField';
import ModalTimer from '#components/ModalTimer';

import { LoadingContext } from '#contexts/LoadingContext';

import { resetPasswordSchema } from '#helpers/schemas';

import { resetPassword } from '#helpers/api';

import { LogoGaleries } from '#ressources/svgComponents';

interface ConfirmAccountI {
  setCallbackModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    error: boolean;
    text: string;
  }>>
}

const initialValues = {
  password: '',
  confirmPassword: '',
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 320px;
`;

const Logo = styled.h1`
  width: 60%;
  margin: 70px 0 80px 0;
`;

const Form = styled.form`
  width: 100%;
`;

const Title = styled.h2`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  margin-bottom: 40px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
`;

const NavLink = styled.div`
  margin-top: 40px;
  text-align: right;
  border-top: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  width: 100%;
  padding-top: 20px;
  & > a {
    padding: 4px 6px;
    font-size: 0.8rem;
    text-decoration: none;
    transition: color 400ms;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      color: ${({ theme }) => theme.colors.black}
    }
  }
`;

const ResetPassword = ({
  setCallbackModal,
}:ConfirmAccountI) => {
  const { loading, setLoading } = React.useContext(LoadingContext);
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const [errorModal, setErrorModal] = React.useState<{
    open: boolean;
    text: string;
  }>({
    open: false,
    text: '',
  });
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
          testId='submitButton'
          disabled={loading}
          marginBottom={15}
          marginTop={25}
          type='submit'
          title='Reset password'
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
