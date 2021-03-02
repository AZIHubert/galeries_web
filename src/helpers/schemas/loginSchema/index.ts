import * as Yup from 'yup';

import {
  REQUIRED,
} from '#helpers/formErrors';

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .required(REQUIRED),
  userNameOrEmail: Yup.string()
    .trim()
    .required(REQUIRED),
});

export default loginSchema;
