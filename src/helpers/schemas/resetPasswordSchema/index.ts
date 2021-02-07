import * as Yup from 'yup';

import {
  EMAIL_FIELD,
  REQUIRED,
} from '#helpers/formErrors';

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required(REQUIRED)
    .email(EMAIL_FIELD),
});

export default resetPasswordSchema;
