import { useFormik } from 'formik';
import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Button from '#components/Button';
import Field from '#components/Field';
import Text from '#components/Text';

import { deleteAccountSchema } from '#helpers/schemas';

import {
  deleteAccount,
  resetAccount,
  setAccount,
} from '#store/actions';
import {
  accountErrorsSelector,
  loadingSelector,
} from '#store/selectors';

const initialValues = {
  deleteAccountSentence: '',
  password: '',
  userNameOrEmail: '',
};

const ModalDelete = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (!loading) {
        dispatch(deleteAccount(values));
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: deleteAccountSchema,
  });
  const loading = useSelector(loadingSelector);
  const accountErrors = useSelector(accountErrorsSelector);

  React.useEffect(() => () => {
    dispatch(resetAccount());
  }, []);

  return (
    <div>
      <Text
        color='danger'
        styles={{
          fontSize: 1.1,
          marginBottom: 30,
        }}
      >
        Are you sure you want to do this?
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Field
          disabled={loading}
          error={
            formik.errors.userNameOrEmail || accountErrors.userNameOrEmail
          }
          fieldTestId='field'
          id='userNameOrEmail'
          label='user name or email'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (accountErrors.userNameOrEmail) {
              dispatch(
                setAccount({
                  errors: {
                    ...accountErrors,
                    userNameOrEmail: '',
                  },
                }),
              );
            }
          }}
          styles={{
            marginBottom: 6,
          }}
          stylesLaptopL={{
            marginBottom: 10,
          }}
          touched={formik.touched.userNameOrEmail}
          type='text'
          value={formik.values.userNameOrEmail}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.deleteAccountSentence || accountErrors.deleteAccountSentence
          }
          fieldTestId='field'
          id='deleteAccountSentence'
          label='To verify, type "delete my account" below:'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (accountErrors.deleteAccountSentence) {
              dispatch(
                setAccount({
                  errors: {
                    ...accountErrors,
                    deleteAccountSentence: '',
                  },
                }),
              );
            }
          }}
          styles={{
            marginBottom: 6,
          }}
          stylesLaptopL={{
            marginBottom: 10,
          }}
          touched={formik.touched.deleteAccountSentence}
          type='text'
          value={formik.values.deleteAccountSentence}
        />
        <Field
          disabled={loading}
          error={
            formik.errors.password || accountErrors.password
          }
          fieldTestId='field'
          id='password'
          label='confirm your password'
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.handleChange(e);
            if (accountErrors.password) {
              dispatch(
                setAccount({
                  errors: {
                    ...accountErrors,
                    password: '',
                  },
                }),
              );
            }
          }}
          touched={formik.touched.password}
          type='password'
          value={formik.values.password}
        />
        <Button.Default
          danger
          disabled={loading}
          data-testid='submitButton'
          styles={{
            marginBottom: 10,
            marginTop: 20,
          }}
          stylesLaptopL={{
            marginTop: 24,
          }}
          type='submit'
          title='delete your account'
        />
      </form>
    </div>
  );
};

export default ModalDelete;
