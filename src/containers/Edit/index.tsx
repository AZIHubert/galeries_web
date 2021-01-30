import * as React from 'react';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const Edit = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div>
      <ChangePassword
        loading={loading}
        setLoading={setLoading}
      />
      <ChangeEmail
        loading={loading}
        setLoading={setLoading}
      />
      <DeleteAccount />
    </div>
  );
};

export default Edit;
