import * as Yup from 'yup';

import {
  CONFIRM_PASSWORD,
  HAS_SPACES,
  MAX_LENGTH_THRITY,
  MIN_LENGTH_OF_HEIGH,
  PASSWORD,
  REQUIRED,
} from '#helpers/formErrors';

const resetPasswordSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required(REQUIRED)
    .oneOf([Yup.ref('password'), null], CONFIRM_PASSWORD),
  password: Yup.string()
    .required(REQUIRED)
    .matches(/^\S*$/, HAS_SPACES)
    .min(8, MIN_LENGTH_OF_HEIGH)
    .max(30, MAX_LENGTH_THRITY)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
      PASSWORD,
    ),
});

export default resetPasswordSchema;
