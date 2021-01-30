import * as Yup from 'yup';

import {
  REQUIRED,
} from '#helpers/formErrors';

const changeEmailSchema = Yup.object().shape({
  password: Yup.string()
    .required(REQUIRED),
});

export default changeEmailSchema;
