import * as Yup from 'yup';

import {
  MAX_LENGTH_THRITY,
  MAX_LENGTH_TWO_HUNDRER,
  MIN_LENGTH_OF_FIVE,
  MIN_LENGTH_OF_TEN,
  REQUIRED,
} from '#helpers/formErrors';

const signinSchema = Yup.object().shape({
  header: Yup.string()
    .required(REQUIRED)
    .min(5, MIN_LENGTH_OF_FIVE)
    .max(30, MAX_LENGTH_THRITY),
  body: Yup.string()
    .required(REQUIRED)
    .min(10, MIN_LENGTH_OF_TEN)
    .max(200, MAX_LENGTH_TWO_HUNDRER),
});

export default signinSchema;
