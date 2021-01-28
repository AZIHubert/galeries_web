import * as Yup from 'yup';

import {
  REQUIRED,
} from '#helpers/formErrors';

const loginSchema = Yup.object().shape({
  userNameOrEmail: Yup.string()
    .required(REQUIRED),
  password: Yup.string()
    .required(REQUIRED),
});

export default loginSchema;
