import * as React from 'react';

import ChangePassword from './ChangePassword';

const Edit = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div>
      <ChangePassword
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Edit;
