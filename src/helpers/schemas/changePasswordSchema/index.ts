import * as Yup from 'yup';

import {
  CONFIRM_PASSWORD,
  HAS_SPACES,
  MAX_LENGTH_THRITY,
  MIN_LENGTH_OF_HEIGH,
  PASSWORD,
  REQUIRED,
} from '#helpers/formErrors';

const changePasswordSchema = Yup.object().shape({
  confirmNewPassword: Yup.string()
    .required(REQUIRED)
    .oneOf([Yup.ref('newPassword'), null], CONFIRM_PASSWORD),
  currentPassword: Yup.string()
    .required(REQUIRED),
  newPassword: Yup.string()
    .required(REQUIRED)
    .matches(/^\S*$/, HAS_SPACES)
    .min(8, MIN_LENGTH_OF_HEIGH)
    .max(30, MAX_LENGTH_THRITY)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
      PASSWORD,
    ),
});

export default changePasswordSchema;
