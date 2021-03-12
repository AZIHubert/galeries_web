import * as Yup from 'yup';

import {
  MAX_LENGTH_THRITY,
  MIN_LENGTH_OF_THREE,
  REQUIRED,
} from '#helpers/formErrors';

const signinSchema = Yup.object().shape({
  pseudonym: Yup.string()
    .required(REQUIRED)
    .trim()
    .min(3, MIN_LENGTH_OF_THREE)
    .max(30, MAX_LENGTH_THRITY),
});

export default signinSchema;
