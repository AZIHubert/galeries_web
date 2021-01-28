import * as Yup from 'yup';

import {
  CONFIRM_PASSWORD,
  EMAIL_FIELD,
  HAS_SPACES,
  MAX_LENGTH_THRITY,
  MIN_LENGTH_OF_HEIGH,
  MIN_LENGTH_OF_THREE,
  PASSWORD,
  REQUIRED,
} from '#helpers/formErrors';

const signinSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required(REQUIRED)
    .oneOf([Yup.ref('password'), null], CONFIRM_PASSWORD),
  email: Yup.string()
    .required(REQUIRED)
    .email(EMAIL_FIELD),
  password: Yup.string()
    .required(REQUIRED)
    .matches(/^\S*$/, HAS_SPACES)
    .min(8, MIN_LENGTH_OF_HEIGH)
    .max(30, MAX_LENGTH_THRITY)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
      PASSWORD,
    ),
  userName: Yup.string()
    .required(REQUIRED)
    .matches(/^\S*$/, HAS_SPACES)
    .min(3, MIN_LENGTH_OF_THREE)
    .max(30, MAX_LENGTH_THRITY),
});

export default signinSchema;
