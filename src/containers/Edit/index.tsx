import * as React from 'react';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const Edit = () => (
  <>
    <ChangePassword />
    <ChangeEmail />
    <DeleteAccount />
  </>
);

export default Edit;
