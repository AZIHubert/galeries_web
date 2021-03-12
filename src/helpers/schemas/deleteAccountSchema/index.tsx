import * as Yup from 'yup';

import {
  REQUIRED,
} from '#helpers/formErrors';

const deleteAccountSchema = Yup.object().shape({
  deleteAccountSentence: Yup.string()
    .trim()
    .required(REQUIRED)
    .matches(/(delete my account)/, 'wrong sentence'),
  password: Yup.string()
    .trim()
    .required(REQUIRED),
  userNameOrEmail: Yup.string()
    .trim()
    .required(REQUIRED),
});

export default deleteAccountSchema;
