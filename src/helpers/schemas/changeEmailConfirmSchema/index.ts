import * as Yup from 'yup';

import {
  EMAIL_FIELD,
  REQUIRED,
} from '#helpers/formErrors';

const signinSchema = Yup.object().shape({
  password: Yup.string()
    .required(REQUIRED),
  email: Yup.string()
    .trim()
    .required(REQUIRED)
    .email(EMAIL_FIELD),
});

export default signinSchema;
