import * as Yup from 'yup';

import {
  REQUIRED,
} from '#helpers/formErrors';

const deleteAccountSchema = Yup.object().shape({
  password: Yup.string()
    .required(REQUIRED),
});

export default deleteAccountSchema;
